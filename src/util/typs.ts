import { Request, Response } from "express";

export type Controller = (a: Request, b: Response) => void;

export type postgresConfigType = {
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number | undefined;
};

export type directors = {
  name: string;
  nationality: string;
  DOB: string;
};

export type actors = {
  name: string;
  nationality: string;
  DOB: string;
};

export type movie = {
  directorid: number;
  releaseYear: number;
  title: string;
};

export type rating = {
  rating: number;
  movieid: number;
};
