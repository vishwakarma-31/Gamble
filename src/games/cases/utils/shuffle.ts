// utils/shuffle.ts
export function shuffle<T>(array: T[]): T[] {
      return [...array].sort(() => Math.random() - 0.5);
    }
    