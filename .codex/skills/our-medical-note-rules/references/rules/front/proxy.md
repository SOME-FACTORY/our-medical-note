# Next.js 프록시 패턴

백엔드 URL 노출 방지 및 CORS 우회를 위해 Next.js를 프록시 레이어로 활용한다.

## 언제 프록시를 쓰는가

| 상황 | 방법 |
|------|------|
| 백엔드 URL을 클라이언트에 노출하지 않을 때 | `next.config.js` rewrites |
| 단순 경로 포워딩 | rewrites |
| 요청/응답 가공, 인증 헤더 주입 | Route Handler |
| 외부 API 키를 서버에서만 사용할 때 | Route Handler |

## 1. next.config.js rewrites (단순 포워딩)

가공 없이 경로만 바꿀 때 사용한다. 빌드 타임에 설정되며 런타임 오버헤드가 없다.

```typescript
// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};
```

- `API_BASE_URL`은 서버 전용 환경변수 (접두사 없음, 클라이언트 노출 금지)
- 클라이언트는 `/api/...`만 알고, 실제 백엔드 주소는 서버에서만 해석

## 2. Route Handler 프록시 (헤더 주입 / 응답 가공)

인증 헤더 주입, 응답 필터링, 에러 변환이 필요할 때 사용한다.

```typescript
// app/api/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE_URL!;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${API_BASE}/${path.join("/")}${req.nextUrl.search}`;

  const res = await fetch(url, {
    headers: {
      "x-internal-token": process.env.INTERNAL_TOKEN!,
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
```

## 3. SSE 스트리밍 프록시

백엔드 SSE를 그대로 클라이언트에 릴레이할 때.

```typescript
// app/api/stream/route.ts
export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstream = await fetch(`${process.env.API_BASE_URL}/stream`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  // ReadableStream 그대로 전달
  return new Response(upstream.body, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  });
}
```

## CORS 처리

백엔드가 Next.js 서버에서만 호출되므로 백엔드 CORS는 Next.js 서버 IP만 허용하면 된다.
클라이언트 → Next.js → 백엔드 구조이므로 브라우저 CORS 문제가 원천 차단된다.

```
브라우저 → /api/... (Next.js, same-origin) → 백엔드 (서버-서버)
```

## 금지 사항

- ❌ `NEXT_PUBLIC_API_URL`로 백엔드 URL을 클라이언트에 노출
- ❌ 클라이언트 컴포넌트에서 직접 외부 API 호출 (API 키 노출 위험)
- ❌ Route Handler에서 에러를 그대로 pass-through (내부 에러 메시지 노출 위험)
