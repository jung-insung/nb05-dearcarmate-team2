import z from "zod";

export type ConfigType = z.infer<typeof configSchema>;

export const configSchema = z.object({
  PORT: z.coerce.number(),
  SALT_LEVEL: z.coerce
    .number()
    .min(8, "솔트 레벨은 최소 8이상으로 권장합니다.")
    .max(12, "솔트 레벨은 최대 12이하로 권장합니다."),
  NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
  CLIENT_DOMAIN: z.string(),
  PUBLIC_PATH: z.string(),
  JSON_LIMIT: z.coerce.number(),
});

export interface IConfigUtil {
  getParsed: () => ConfigType;
}
