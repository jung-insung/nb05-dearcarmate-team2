import { PrismaClient } from "@prisma/client";

export type PrismaClientTransaction = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
>;

export type BasePrismaClient = PrismaClient | PrismaClientTransaction;

export class BaseRepo {
  constructor(protected _prisma: BasePrismaClient) {}
}
