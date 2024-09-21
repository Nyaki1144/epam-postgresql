import { Request, Response } from "express";

export type Controller = (a: Request, b: Response) => void;

export type postgresConfigType = {
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number | undefined;
};
