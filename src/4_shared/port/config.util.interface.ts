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
  MAX_RETRIES: z.coerce.number(),
  OPTIMISTIC_LOCK_RETRY_DELAY_MS: z.coerce.number(),
  TOKEN_SECRET: z.string().min(8, "토큰 시크릿은 최소 8자 이상입니다."),
  ACCESS_TOKEN_EXPIRES_IN: z.enum(["15m", "1h", "7h"]).default("1h"),
  REFRESH_TOKEN_EXPIRES_IN: z.enum(["1d", "7d"]).default("1d"),
});

export interface IConfigUtil {
  getParsed: () => ConfigType;
}
