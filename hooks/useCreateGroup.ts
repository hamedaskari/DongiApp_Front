"use client";
import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: handleCreateGroup,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      return axiosInstance.post("/group", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group"] });
      toast.success("گروه ساخته شد");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { handleCreateGroup, isPending, isSuccess };
};
