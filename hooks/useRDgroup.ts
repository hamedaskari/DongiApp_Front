import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";

export const useRDgroup = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // Delete Group
  const { mutateAsync: handleDeleteGroup, isPending: isPendingDelete } =
    useMutation({
      mutationFn: async (groupId: string) => {
        try {
          const finalDeleteData = {
            userMobile: user?.mobile,
            groupId: Number(groupId),
          };

          await axiosInstance.delete("/group", { data: finalDeleteData });

          queryClient.invalidateQueries({ queryKey: ["group"] });

          toast.success("گروه حذف شد");
        } catch (error) {
          console.error(error);
        }
      },
    });

  // Rename Group
  const { mutateAsync: handleRenameGroup, isPending: isPendingRename } =
    useMutation({
      mutationFn: async (data: {
        groupName: string;
        groupID: string | number;
      }) => {
        const { groupName, groupID } = data;
        try {
          await axiosInstance.patch(`/group/${groupID}`, { groupName });

          queryClient.invalidateQueries({ queryKey: ["group"] });

          toast.success("نام گروه تغییر کرد");
        } catch (error) {
          console.error(error);
        }
      },
    });

  return {
    handleDeleteGroup,
    handleRenameGroup,
    isPendingDelete,
    isPendingRename,
  };
};
