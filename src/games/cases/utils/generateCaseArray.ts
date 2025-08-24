import { Case } from '../data/casesData';

/**
 * Generate an array of cases based on weighted probability and shuffle the result.
 * @param cases - Array of case objects (must include 'probability' field).
 * @param size - Desired number of output items.
 */
export function generateCaseArray(cases: Case[], size: number): Case[] {
  const weightedList: Case[] = [];

  // Expand based on weight
  for (const c of cases) {
    const weightCount = Math.floor(c.probability * 10);
    for (let i = 0; i < weightCount; i++) {
      weightedList.push(c);
    }
  }

  // Random selection
  const selected: Case[] = [];
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * weightedList.length);
    selected.push(weightedList[randomIndex]);
  }

  // Shuffle
  return selected.sort(() => Math.random() - 0.5);
}
