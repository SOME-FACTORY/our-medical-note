"use client";

import { useState } from "react";

import { signInWithKakao } from "./actions";

type LoginFormProps = {
  isConfigured: boolean;
};

export function LoginForm({ isConfigured }: LoginFormProps) {
  const [confirmed, setConfirmed] = useState(false);
  const canSubmit = confirmed && isConfigured;

  return (
    <form action={signInWithKakao} className="mt-auto w-full space-y-4">
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl px-1 py-2">
        <span
          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border transition ${
            confirmed
              ? "border-[#4f53c9] bg-[#4f53c9]"
              : "border-[#cfd2e0] bg-white"
          }`}
        >
          {confirmed ? (
            <span className="block size-2.5 rotate-45 border-b-2 border-r-2 border-white" />
          ) : null}
        </span>
        <input
          checked={confirmed}
          className="sr-only"
          name="safety_notice_confirmed"
          onChange={(event) => setConfirmed(event.target.checked)}
          type="checkbox"
        />
        <span className="text-sm font-medium leading-6 text-[#4a4e62]">
          안내를 확인했어요.
        </span>
      </label>

      <button
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[1.1rem] bg-[#FEE500] text-base font-bold text-[#191919] shadow-[0_16px_26px_-18px_rgba(40,42,70,.55)] transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_20px_30px_-18px_rgba(40,42,70,.62)] disabled:cursor-not-allowed disabled:bg-[#dcdde6] disabled:text-[#a3a6b6]"
        disabled={!canSubmit}
        type="submit"
      >
        <span
          aria-hidden="true"
          className="relative size-5 rounded-full bg-current before:absolute before:bottom-0 before:left-1 before:size-2 before:origin-bottom-left before:-rotate-45 before:rounded-sm before:bg-current"
        />
        카카오로 시작하기
      </button>
    </form>
  );
}
