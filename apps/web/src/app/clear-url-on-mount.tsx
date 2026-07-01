"use client";

import { useEffect } from "react";

export function ClearUrlOnMount() {
  useEffect(() => {
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.hash,
    );
  }, []);

  return null;
}
