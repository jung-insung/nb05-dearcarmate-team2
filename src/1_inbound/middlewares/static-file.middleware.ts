import express from "express";
import path from "path";

export class StaticFileMiddleware {
  constructor(public readonly basePath: string, private readonly folderPath: string) {}

  handler = () => {
    return express.static(path.join(__dirname, this.folderPath));
  };
}
