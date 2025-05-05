import { useUser } from "@/context/UserContext";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function useGetNotif() {
  const { user } = useUser();
  const pathname = usePathname();
  //get user notifs(Requests sent by group admins)
  const {
    data: notifData,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/group/income-request");
      return res?.data?.data || [];
    },
    enabled: !!user && pathname !== "/register",
  });
  return { notifData, refetch, isPending };
}
