"use client";

import { useSyncExternalStore } from "react";

function mediaPreference(query: string) {
  let media: MediaQueryList | undefined;
  const getMedia = () => (media ??= window.matchMedia?.(query));

  return {
    subscribe(onChange: () => void) {
      const list = getMedia();
      list?.addEventListener("change", onChange);
      return () => list?.removeEventListener("change", onChange);
    },
    getSnapshot: () => getMedia()?.matches ?? false,
  };
}

const reducedMotion = mediaPreference("(prefers-reduced-motion: reduce)");
const customCursor = mediaPreference(
  "(pointer: fine) and (prefers-reduced-motion: no-preference)"
);
// React uses the same snapshot on the server and during hydration.
const getServerSnapshot = () => false;

export function useReducedMotion() {
  return useSyncExternalStore(
    reducedMotion.subscribe,
    reducedMotion.getSnapshot,
    getServerSnapshot
  );
}

export function useCustomCursorEnabled() {
  return useSyncExternalStore(
    customCursor.subscribe,
    customCursor.getSnapshot,
    getServerSnapshot
  );
}
