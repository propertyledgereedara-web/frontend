// src/lib/authEvents.ts
type Listener = () => void;

const listeners = new Set<Listener>();

export function onAuthExpired(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitAuthExpired(): void {
  for (const l of listeners) l();
}
