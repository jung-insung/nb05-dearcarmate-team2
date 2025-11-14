import { PrismaClient } from "@prisma/client";

export class BaseRepo {
  constructor(protected _prisma: PrismaClient) {};
}