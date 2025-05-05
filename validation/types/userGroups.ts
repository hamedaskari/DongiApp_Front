import { PaginatedData } from "./paginateData";

export type Member = {
  id: number;
  name: string;
  family: string;
  mobile: string;
  isAdmin: boolean;
  baleId: number;
  extraInfo: unknown | null;
};

export type Group = {
  id: number;
  name: string;
  creator: Member;
};

export type GroupMembership = {
  id: number;
  member: Member;
  group: Group;
  isAcceptedInvite: boolean;
};

export type UserGroupsData = {
  message: string;
  data: PaginatedData<GroupMembership>;
};
