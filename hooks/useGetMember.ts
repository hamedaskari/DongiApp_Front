"use client";
import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/validation/types/errorRes";
import { PaginatedData } from "@/validation/types/paginateData";
import { GroupMembership } from "@/validation/types/userGroups";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function useGetMembers(page) {
  const pathName = usePathname();
  const groupID = pathName.split("/")[2];

  const {
    data: groupMembers,
    isLoading,
    refetch,
    isError,
  } = useQuery<PaginatedData<GroupMembership>, ErrorResponse>({
    queryKey: ["groupMembers", groupID, page],
    queryFn: async () => {
      if (!groupID) throw new Error("ایدی گروه در دسترس نیست");

      const res = await axiosInstance.get(
        `/group/${groupID}/member?page=${page || 1}`
      );

      return res.data?.data as PaginatedData<GroupMembership>;
    },
  });

  return { groupMembers, isLoading, isError, refetch };
}
