export interface Movie {
    _id: string;
    title: string;
    cast: string[];
    synopsis: string;
    runningTime: number;
    poster: string;
    status: "active" | "upcoming" | "completed";
    genres: string[];
}
