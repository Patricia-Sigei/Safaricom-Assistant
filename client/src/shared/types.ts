export type Message = {
  sender: "user" | "assistant";
  text: string;
};

export type Bundle = {
  id: number;
  name: string;
  price: number;
  durationDays: number;
  dataAmountMb: number;
  bonusDataMb?: number | null;
  bonusSms?: number | null;
  bonusCallsMin?: number | null;
  expiryType: string;
  autoRenew: boolean;
  explanation: string;
  tags: string[];
};
