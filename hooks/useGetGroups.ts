import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GroupMembership } from "@/validation/types/userGroups";
import { PaginatedData } from "@/validation/types/paginateData";
import { ErrorResponse } from "@/validation/types/errorRes";

export function useGetGroups(page: number) {
  const { data: groupData, isLoading } = useQuery<
    PaginatedData<GroupMembership>,
    ErrorResponse
  >({
    queryKey: ["group", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/group?page=${page}`);

      return (res.data.data as PaginatedData<GroupMembership>) ?? [];
    },
  });

  return { groupData, isLoading };
}
