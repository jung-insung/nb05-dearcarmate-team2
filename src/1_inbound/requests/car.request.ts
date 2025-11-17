import { z } from "zod";

const CAR_NUMBER_REGEX = /^[0-9]{2,3}[가-힣][0-9]{4}$/;

export const registerCarSchema = z.object({
  carNumber: z.string().trim().nonempty().regex(CAR_NUMBER_REGEX),
  manufacturer: z.enum(["기아", "현대", "쉐보레"]),
  model: z.string().trim().nonempty(),
  type: z.enum(["세단", "경차", "SUV"]),
  manufacturingYear: z.number().int().gte(1980),
  mileage: z.number().int().nonnegative(),
  price: z.number().int().nonnegative(),
  accidentCount: z.number().int().nonnegative().default(0),
  explanation: z.string().trim().optional(),
  accidentDetails: z.string().trim().optional(),
});

export const updateCarSchema = registerCarSchema;

export type RegisterCarReq = z.infer<typeof registerCarSchema>;
export type UpdateCarReq = z.infer<typeof updateCarSchema>;
