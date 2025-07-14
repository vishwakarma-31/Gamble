
export interface SportsCategory {
  _id: string;
  title: string;
  icon: string;
  status: string;
  ActiveEvent: string; 
  ActiveTeam: string;
  ActiveMatch: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SportsCategoryResponse {
  data: SportsCategory[];
  statusCode: number;
  success: boolean; 
  message: string;
}

