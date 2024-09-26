// Define the interface for the movie data
export interface Movie {
    _id?: string;
    title: string;
    cast?: string[];
    synopsis?: string;
    runningTime?: number;
    poster?: string;
    status?: string;
    genres?: string[];
}

export interface MovieWithId extends Movie {
    _id: string; 
  }
  
