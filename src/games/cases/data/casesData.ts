// casesData.ts

export interface Case {
  id: string;
  baseColor: string;
  panelColor: string;
  probability: number;
  level: number;
  type: string;
}

export const easyCases: Case[] = [
  { id: 'gold-1', baseColor: '#FFD700', panelColor: '#FFD700', probability: 1.0, level: 1, type: 'gold' },
  { id: 'purple-1', baseColor: '#800080', panelColor: '#800080', probability: 2.0, level: 1, type: 'purple' },
  { id: 'green-1', baseColor: '#00FF00', panelColor: '#00FF00', probability: 4.0, level: 1, type: 'green' },
  { id: 'red-1', baseColor: '#FF0000', panelColor: '#FF0000', probability: 7.0, level: 1, type: 'red' },
  { id: 'blue-1', baseColor: '#0000FF', panelColor: '#0000FF', probability: 10.0, level: 1, type: 'blue' },
  { id: 'lightblue-1', baseColor: '#00FFFF', panelColor: '#00FFFF', probability: 35.0, level: 1, type: 'lightblue' },
  { id: 'gray-1', baseColor: '#808080', panelColor: '#808080', probability: 41.0, level: 1, type: 'gray' },
];

export const mediumCases: Case[] = [
  { id: 'gold-1', baseColor: '#FFD700', panelColor: '#FFD700', probability: 0.1, level: 1, type: 'gold' },
  { id: 'purple-1', baseColor: '#800080', panelColor: '#800080', probability: 0.15, level: 1, type: 'purple' },
  { id: 'green-2', baseColor: '#00CC00', panelColor: '#00CC00', probability: 0.4, level: 2, type: 'green' },
  { id: 'green-1', baseColor: '#00FF00', panelColor: '#00FF00', probability: 0.85, level: 1, type: 'green' },
  { id: 'red-2', baseColor: '#CC0000', panelColor: '#CC0000', probability: 1.5, level: 2, type: 'red' },
  { id: 'red-1', baseColor: '#FF0000', panelColor: '#FF0000', probability: 3.0, level: 1, type: 'red' },
  { id: 'blue-2', baseColor: '#0000CC', panelColor: '#0000CC', probability: 6.0, level: 2, type: 'blue' },
  { id: 'blue-1', baseColor: '#0000FF', panelColor: '#0000FF', probability: 13.0, level: 1, type: 'blue' },
  { id: 'lightblue-2', baseColor: '#00CCCC', panelColor: '#00CCCC', probability: 18.0, level: 2, type: 'lightblue' },
  { id: 'lightblue-1', baseColor: '#00FFFF', panelColor: '#00FFFF', probability: 27.0, level: 1, type: 'lightblue' },
  { id: 'gray-1', baseColor: '#808080', panelColor: '#808080', probability: 30.0, level: 1, type: 'gray' },
];

export const hardCases: Case[] = [
  { id: 'gold-2', baseColor: '#E6BE00', panelColor: '#E6BE00', probability: 0.005, level: 2, type: 'gold' },
  { id: 'gold-1', baseColor: '#FFD700', panelColor: '#FFD700', probability: 0.01, level: 1, type: 'gold' },
  { id: 'purple-2', baseColor: '#660066', panelColor: '#660066', probability: 0.015, level: 2, type: 'purple' },
  { id: 'purple-1', baseColor: '#800080', panelColor: '#800080', probability: 0.03, level: 1, type: 'purple' },
  { id: 'green-2', baseColor: '#00CC00', panelColor: '#00CC00', probability: 0.04, level: 2, type: 'green' },
  { id: 'green-1', baseColor: '#00FF00', panelColor: '#00FF00', probability: 0.2, level: 1, type: 'green' },
  { id: 'red-2', baseColor: '#CC0000', panelColor: '#CC0000', probability: 0.3, level: 2, type: 'red' },
  { id: 'red-1', baseColor: '#FF0000', panelColor: '#FF0000', probability: 0.4, level: 1, type: 'red' },
  { id: 'blue-3', baseColor: '#000099', panelColor: '#000099', probability: 2.0, level: 3, type: 'blue' },
  { id: 'blue-2', baseColor: '#0000CC', panelColor: '#0000CC', probability: 5.0, level: 2, type: 'blue' },
  { id: 'blue-1', baseColor: '#0000FF', panelColor: '#0000FF', probability: 10.0, level: 1, type: 'blue' },
  { id: 'lightblue-3', baseColor: '#009999', panelColor: '#009999', probability: 10.0, level: 3, type: 'lightblue' },
  { id: 'lightblue-2', baseColor: '#00CCCC', panelColor: '#00CCCC', probability: 12.0, level: 2, type: 'lightblue' },
  { id: 'lightblue-1', baseColor: '#00FFFF', panelColor: '#00FFFF', probability: 25.0, level: 1, type: 'lightblue' },
  { id: 'gray-1', baseColor: '#808080', panelColor: '#808080', probability: 35.0, level: 1, type: 'gray' },
];

export const expertCases: Case[] = [
  { id: 'gold-3', baseColor: '#C5B358', panelColor: '#C5B358', probability: 0.0002, level: 3, type: 'gold' },
  { id: 'gold-2', baseColor: '#E6BE00', panelColor: '#E6BE00', probability: 0.0006, level: 2, type: 'gold' },
  { id: 'gold-1', baseColor: '#FFD700', panelColor: '#FFD700', probability: 0.0012, level: 1, type: 'gold' },
  { id: 'purple-3', baseColor: '#4B0082', panelColor: '#4B0082', probability: 0.003, level: 3, type: 'purple' },
  { id: 'purple-2', baseColor: '#660066', panelColor: '#660066', probability: 0.005, level: 2, type: 'purple' },
  { id: 'purple-1', baseColor: '#800080', panelColor: '#800080', probability: 0.01, level: 1, type: 'purple' },
  { id: 'green-3', baseColor: '#008000', panelColor: '#008000', probability: 0.02, level: 3, type: 'green' },
  { id: 'green-2', baseColor: '#00CC00', panelColor: '#00CC00', probability: 0.03, level: 2, type: 'green' },
  { id: 'green-1', baseColor: '#00FF00', panelColor: '#00FF00', probability: 0.04, level: 1, type: 'green' },
  { id: 'red-3', baseColor: '#990000', panelColor: '#990000', probability: 0.2, level: 3, type: 'red' },
  { id: 'red-2', baseColor: '#CC0000', panelColor: '#CC0000', probability: 0.5, level: 2, type: 'red' },
  { id: 'red-1', baseColor: '#FF0000', panelColor: '#FF0000', probability: 0.8, level: 1, type: 'red' },
  { id: 'blue-3', baseColor: '#000099', panelColor: '#000099', probability: 2.0, level: 3, type: 'blue' },
  { id: 'blue-2', baseColor: '#0000CC', panelColor: '#0000CC', probability: 3.0, level: 2, type: 'blue' },
  { id: 'blue-1', baseColor: '#0000FF', panelColor: '#0000FF', probability: 8.0, level: 1, type: 'blue' },
  { id: 'lightblue-3', baseColor: '#009999', panelColor: '#009999', probability: 15.0, level: 3, type: 'lightblue' },
  { id: 'lightblue-2', baseColor: '#00CCCC', panelColor: '#00CCCC', probability: 15.0, level: 2, type: 'lightblue' },
  { id: 'lightblue-1', baseColor: '#00FFFF', panelColor: '#00FFFF', probability: 20.0, level: 1, type: 'lightblue' },
  { id: 'gray-1', baseColor: '#808080', panelColor: '#808080', probability: 35.39, level: 1, type: 'gray' },
];
