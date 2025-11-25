import z from "zod";

export type GetContractListReqDto = z.infer<typeof getContractListReqSchema>;
export type GetContractReqDto = z.infer<typeof getContractReqSchema>;
export type UpdateContractReq = z.infer<typeof updateContractReqSchema>;
export type UpdateContractStatusReq = z.infer<
  typeof updateContractStatusReqSchema
>;
export type CreateContractReq = z.infer<typeof createContractReqSchema>["body"];

export const getContractListReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  query: z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(1000),
    searchBy: z.enum(["customerName", "userName"]).optional(),
    keyword: z.string().optional(),
  }),
});

export const getContractReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  params: z.object({
    contractId: z.coerce.number({ message: "계약 ID는 숫자여야 합니다." }),
  }),
});

const ISO_DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const CONTRACT_STATUS_KEYS = [
  "CAR_INSPECTION",
  "PRICE_NEGOTIATION",
  "CONTRACT_DRAFT",
  "CONTRACT_SUCCESSFUL",
  "CONTRACT_FAILED",
] as const;

const statusMapping: Record<string, (typeof CONTRACT_STATUS_KEYS)[number]> = {
  carinspection: "CAR_INSPECTION",
  pricenegotiation: "PRICE_NEGOTIATION",
  contractdraft: "CONTRACT_DRAFT",
  contractsuccessful: "CONTRACT_SUCCESSFUL",
  contractfailed: "CONTRACT_FAILED",
};

export const ALARM_TIME_KEYS = ["DAY_BEFORE_9AM", "ON_DAY_9AM"] as const;

export const MeetingItemSchema = z.object({
  date: z.string().regex(ISO_DATE_REGEX),
  alarms: z.array(z.string().regex(ISO_DATETIME_REGEX)).max(2),
});

export const DocumentItemSchema = z.object({
  id: z.number().int(),
  fileName: z.string().min(1),
});

export const updateContractStatusReqSchema = z.object({
  body: z.object({
    status: z
      .string()
      .transform((val) => {
        const upper = val.toUpperCase();
        if (CONTRACT_STATUS_KEYS.includes(upper as any)) {
          return upper;
        }

        const lower = val.toLowerCase().replace(/[_-]/g, "");
        return statusMapping[lower] || val;
      })
      .pipe(z.enum(CONTRACT_STATUS_KEYS)),
  }),
});

export const updateContractReqSchema = z.object({
  body: z.object({
    status: z
      .string()
      .transform((val) => {
        const upper = val.toUpperCase();
        if (CONTRACT_STATUS_KEYS.includes(upper as any)) {
          return upper;
        }
        const lower = val.toLowerCase().replace(/[_-]/g, "");
        const statusMapping: Record<string, string> = {
            carinspection: "CAR_INSPECTION",
            pricenegotiation: "PRICE_NEGOTIATION",
            contractdraft: "CONTRACT_DRAFT",
            contractsuccessful: "CONTRACT_SUCCESSFUL",
            contractfailed: "CONTRACT_FAILED",
        };
        return statusMapping[lower] || val;
      })
      .pipe(z.enum(CONTRACT_STATUS_KEYS))
      .optional(),

    resolutionDate: z.string().regex(ISO_DATETIME_REGEX).nullable().optional(),

    contractPrice: z.number().int().min(0).optional(),

    meetings: z.array(MeetingItemSchema).optional(),
    contractDocuments: z.array(DocumentItemSchema).optional(),
  }),
});

const CreateMeetingItemSchema = z.object({
  date: z.string().regex(ISO_DATETIME_REGEX),
  alarms: z.array(z.string().regex(ISO_DATETIME_REGEX)).max(2),
});

export const createContractReqSchema = z.object({
  body: z.object({
    carId: z.number(),
    customerId: z.number(),
    meetings: z.array(CreateMeetingItemSchema).optional(),
  }),
});
