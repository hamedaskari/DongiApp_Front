import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export const useInviteToGroup = () => {
  const url = usePathname();
  const groupID = url.split("/")[2];

  const { mutateAsync: handleInviteUser, isPending } = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      console.log(data);
      const groupName = { ...data, groupId: groupID };
      try {
        await axiosInstance.post("/group/member", groupName);

        toast.success("درخواست به کاربر ارسال شد");
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { handleInviteUser, isPending };
};
