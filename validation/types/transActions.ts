import { PaginatedData } from "@/validation/types/paginateData";

export type User = {
  user: {
    id: number;
    name: string;
    family: string;
    mobile: string;
  };
  unit: number;
  amount: number;
  isDebtor: boolean;
};

export type Share = {
  id: number;
  isAccepted: boolean;
  group: {
    id: number;
    name: string;
    creator: {
      id: number;
      name: string;
      family: string;
      mobile: string;
      isAdmin: boolean;
      baleId: number;
      extraInfo: unknown | null;
    };
  };
  spender: {
    id: number;
    name: string;
    family: string;
    mobile: string;
    isAdmin: boolean;
    baleId: number;
    extraInfo: unknown | null;
  };
  description: string;
  amount: number;
};

export type ShareData = {
  share: Share;
  users: User[];
};

export type TransActions = {
  message: string;
  data: PaginatedData<ShareData>;
};
