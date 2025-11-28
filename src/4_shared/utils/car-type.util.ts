export const MODEL_TYPE_MAP: Record<string, "세단" | "경차" | "SUV"> = {
  K5: "세단",
  K7: "세단",
  K3: "세단",
  그랜저: "세단",
  소나타: "세단",
  스파크: "경차",
  투싼: "SUV",
  스포티지: "SUV",
  싼타페: "SUV",
  베뉴: "SUV",
  트랙스: "SUV",
};

export function getCarTypeByModel(model: string): "세단" | "경차" | "SUV" {
  return MODEL_TYPE_MAP[model] ?? "세단";
}
