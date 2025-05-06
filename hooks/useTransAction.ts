"use client";
import axiosInstance from "@/lib/axios";
import { PaginatedData } from "@/validation/types/paginateData";
import { ShareData } from "@/validation/types/transActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export const useTransAction = () => {
  const pathName = usePathname();
  const groupID = pathName.split("/")[2];
  const queryClient = useQueryClient();
  //RA(Reject , Accept) TransActions By Admin
  const { mutateAsync: handleRATransActions, isPending: isPendingRA } =
    useMutation({
      mutationFn: async ({
        id,
        action,
      }: {
        id: number;
        action: string | number;
      }) => {
        const res = await axiosInstance.post(`/share/${id}/${action}`);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions", groupID] });
        toast.success("عملیات با موفقیت انجام شد");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });

  //Get List Of TransActions
  const { data: transActionList, isLoading: isLoadingList } = useQuery<
    PaginatedData<ShareData>
  >({
    queryKey: ["transactions", groupID],
    queryFn: async () => {
      const res = await axiosInstance.get(`/share/group/${groupID}`);
      return (res?.data?.data as PaginatedData<ShareData>) ?? [];
    },
  });

  //Create TransActions

  const {
    mutateAsync: handleCreateTransAction,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreateTransActions,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const finalData = {
        ...formData,
        groupId: groupID,
      };
      const response = await axiosInstance.post("/share", finalData);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تراکنش ساخته شد");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return {
    handleRATransActions,
    handleCreateTransAction,
    isPendingCreate,
    isLoadingList,
    transActionList,
    isPendingRA,
    isSuccessCreateTransActions,
  };
};
