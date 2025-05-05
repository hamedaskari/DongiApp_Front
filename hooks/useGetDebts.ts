"use client";
import axiosInstance from "@/lib/axios";
import { SettleData } from "@/validation/types/debts";
import { PaginatedData } from "@/validation/types/paginateData";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export const useGetDebts = () => {
  const pathName = usePathname();
  const groupID = pathName.split("/")[2];

  const { data: debtsData, isPending } = useQuery<PaginatedData<SettleData>>({
    queryKey: ["debts", groupID],

    queryFn: async () => {
      const res = await axiosInstance.get(
        `/share/group/${groupID}/settle-list`
      );
      return res?.data?.data;
    },
  });
  return { debtsData, isPending };
};
