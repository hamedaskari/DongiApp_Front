"use client";

import { Card } from "@/components/ui/card";
import { useGetNotif } from "@/hooks/useGetNotif";
import { useMemberShipReq } from "@/hooks/useMemberShipReq";
import Loading from "@/components/loading/Loading";
import { PaginationDemo } from "@/components/Pagination";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function GetNotifs() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const router = useRouter();
  //handle Accept Or Reject Button to invites
  const {
    handleAcceptMemberShip,
    handleRejectMemberShip,
    isPending: isPendingMemberShip,
  } = useMemberShipReq();

  //Get All User Notifications
  const { notifData, isPending } = useGetNotif();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    setPage(newPage);
  };

  if (isPending) return <Loading />;

  const numberOfItems = notifData?.data?.length <= 0;
  //get number of page for pagination
  const numberOfPages = notifData?.last_page;

  return (
    <div className=" lg:p-2 md:p-5 space-y-4 overflow-y-auto">
      {numberOfItems ? (
        <span className="w-full flex justify-center text-center">
          هیچ درخواستی ندارید
        </span>
      ) : (
        <>
          {notifData?.data?.map((item) => (
            <Card
              key={`cardId-${item.id}`}
              className="flex   flex-col md:flex-row items-center p-4"
            >
              <div className="flex order-2  md:order-0 gap-1.5">
                {" "}
                <Button
                  disabled={isPendingMemberShip}
                  onClick={() => handleAcceptMemberShip(item.id)}
                  type="button"
                  className={` transition-all duration-300 bg-green-400 cursor-pointer hover:bg-green-700 
                    `}
                  size="sm"
                >
                  پیوستن
                </Button>
                <Button
                  disabled={isPendingMemberShip}
                  onClick={() => handleRejectMemberShip(item.id)}
                  type="button"
                  className={`transition-all duration-300 bg-red-400 cursor-pointer hover:bg-red-700 
                      `}
                  size="sm"
                >
                  حذف
                </Button>
              </div>
              <div className="ml-4 flex justify-end flex-1 gap-2.5 text-right">
                <h3 className="text-sm ">{item?.group?.name}</h3>
              </div>
              <div className="relative flex justify-center items-center w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/166258.png"
                  alt={item.id}
                  width={48}
                  height={48}
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </Card>
          ))}
        </>
      )}

      {!numberOfItems && (
        <PaginationDemo
          page={page}
          setPage={handlePageChange}
          pages={numberOfPages}
        />
      )}
    </div>
  );
}
