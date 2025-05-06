"use client";
import { useGetNotif } from "@/hooks/useGetNotif";
import { DialogDemo } from "@/components/Modal";
import { FaRegBell } from "react-icons/fa6";
import GetNotifs from "./GetNotifs";

export default function Notifications() {
  const { notifData, refetch, isPending } = useGetNotif();

  //Calc Number Of Notifs
  const Html = notifData?.data?.length > 0 && (
    <div className="w-[20px] absolute left-3 bottom-0.5 h-[20px] bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
      {notifData?.data?.length}
    </div>
  );

  return (
    <div className="relative" onClick={() => refetch()}>
      <DialogDemo
        isLoading={isPending}
        description="گروه هایی که درخواست عضویت به شما داده اند"
        title="درخواست ها"
        DialogTriggerJSX={
          <>
            <FaRegBell className="cursor-pointer" color="white" /> {Html}
          </>
        }
      >
        <GetNotifs />
        {/* <ListNotif /> */}
      </DialogDemo>
    </div>
  );
}
