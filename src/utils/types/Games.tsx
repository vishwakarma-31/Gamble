type Status = "active" |  "lost" | 'cashed_out' |  null;

interface MinesGameState {
  gameId: string;
  grid: string[];
  winningPopUp: boolean;
  isClient: boolean;
  reshuffling: boolean;
  negativeBet: boolean;
  status: Status;
  amountInWallet: number | null;
  gemCount: number;
  bomb: string;
  winAmount: number;
  maxWinAmount: number;
  profit: number;
  clickedMines: number[];
  gameMessage: string;
  clickedIndex: number | null;
  clickedIndices: number[];
}

export type { MinesGameState, Status };