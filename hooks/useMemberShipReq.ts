"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

const memberShipReq = async ({ method, id }) => {
  return axiosInstance.post(`/group/request/${method}/${id}`);
};

export function useMemberShipReq() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: memberShipReq,
  });
  //Accept MemberShip
  const handleAcceptMemberShip = async (id) => {
    try {
      await mutateAsync({ method: "accept", id });
      queryClient.invalidateQueries({ queryKey: ["groupMembers"] });
      queryClient.invalidateQueries({ queryKey: ["group"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("به گروه اضافه شدید");
    } catch (err) {
      console.log(err);
    }
  };
  //Reject MemberShip
  const handleRejectMemberShip = async (id) => {
    try {
      await mutateAsync({ method: "reject", id });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("درخواست حذف شد");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleAcceptMemberShip,
    handleRejectMemberShip,
    isPending,
    error,
  };
}
