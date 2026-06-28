# 인증 보안 — JWT / 세션 / 쿠키 / CORS

## 인증 방식 선택 기준

| 방식 | 장점 | 단점 | 적합한 상황 |
|------|------|------|------------|
| **httpOnly 쿠키** | XSS 불가, 자동 전송 | CSRF 주의 | 대부분의 웹 서비스 |
| **메모리 (in-memory)** | XSS 안전 | 새로고침 시 소멸 | 민감도 높은 SPA |
| **localStorage** | 간편 | XSS에 취약 | 사용 금지 |

**기본 원칙: 토큰은 httpOnly 쿠키에 저장한다.**

## JWT — httpOnly 쿠키 패턴

### 로그인 (Route Handler)

```typescript
// app/api/auth/login/route.ts
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return Response.json({ message: "로그인 실패" }, { status: 401 });
  }

  const { accessToken, refreshToken } = await res.json();
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,          // 15분
    path: "/",
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: "/api/auth/refresh", // refresh 엔드포인트만 접근 가능
  });

  return Response.json({ ok: true });
}
```

### 인증이 필요한 API 호출 (Route Handler)

```typescript
// app/api/protected/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return Response.json({ message: "인증 필요" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API_BASE_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return Response.json(await res.json(), { status: res.status });
}
```

### 로그아웃

```typescript
// app/api/auth/logout/route.ts
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  return Response.json({ ok: true });
}
```

## 미들웨어 — 인증 보호 라우트

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/dashboard", "/settings", "/profile"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const isProtected = PROTECTED.some((p) => req.nextUrl.pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
```

## CSRF 방어

httpOnly 쿠키 + `sameSite: "lax"` 조합으로 대부분의 CSRF를 방어한다.

- `sameSite: "lax"` — 외부 사이트에서 POST 요청 시 쿠키 미전송
- `sameSite: "strict"` — 외부 링크 클릭도 쿠키 미전송 (UX 저하 가능)
- 추가 방어가 필요하면 CSRF 토큰을 응답 헤더나 별도 쿠키(non-httpOnly)로 제공

## CORS 설정

### Next.js Route Handler

```typescript
// 허용할 origin 명시 — * 금지
const ALLOWED_ORIGINS = [
  "https://myapp.com",
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
].filter(Boolean);

export function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : "";

  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
```

### 백엔드 CORS 전략

Next.js를 프록시로 사용하면 백엔드는 Next.js 서버 IP만 허용하면 된다.
브라우저가 백엔드에 직접 접근하지 않으므로 CORS 설정이 단순해진다.

```
✅ 브라우저 → Next.js (same-origin, CORS 없음) → 백엔드 (서버-서버)
❌ 브라우저 → 백엔드 (cross-origin, CORS 복잡)
```

## 토큰 갱신 (Silent Refresh)

```typescript
// app/api/auth/refresh/route.ts
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return Response.json({ message: "재인증 필요" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return Response.json({ message: "세션 만료" }, { status: 401 });
  }

  const { accessToken } = await res.json();
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  return Response.json({ ok: true });
}
```

## 금지 사항

- ❌ `localStorage`에 JWT 저장 (XSS 취약)
- ❌ 클라이언트 컴포넌트에서 토큰 직접 읽기/쓰기
- ❌ CORS `Access-Control-Allow-Origin: *` + `credentials: true` 동시 사용 (브라우저 차단)
- ❌ 토큰을 URL 파라미터로 전달 (서버 로그에 노출)
- ❌ `sameSite: "none"` without `secure: true`
