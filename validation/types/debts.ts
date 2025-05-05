import { PaginatedData } from "./paginateData";

export type SettleData = {
  from: string;
  to: string;
  amount: number;
};

export type SettleListResponse = {
  message: string;
  data: PaginatedData<SettleData>;
};
