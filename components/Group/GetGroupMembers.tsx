"use client";

import { useGetMembers } from "@/hooks/useGetMember";
import { Card } from "@/components/ui/card";
import { BadgeDemo } from "@/util/CustomBadge";
import Loading from "@/components/loadings/Loading";
import { PaginationDemo } from "@/util/Pagination";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function GetGroupMembers() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const router = useRouter();
  //is User Admin
  const checkIsAdmin = (item) => {
    console.log(item);
    if (item?.group?.creator?.id === item?.member?.id) return true;
    else return false;
  };

  const { groupMembers, isLoading } = useGetMembers(page);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    setPage(newPage);
  };

  if (isLoading) return <Loading />;

  const numberOfItems = groupMembers?.length <= 0;
  //get number of page for pagination
  const numberOfPages = groupMembers?.last_page;

  return (
    <div className="p-3  lg:p-9 md:p-5 space-y-4 overflow-y-auto">
      {numberOfItems ? (
        <span className="w-full flex justify-center text-center">
          داده‌ای برای نمایش وجود ندارد
        </span>
      ) : (
        <>
          {groupMembers?.data?.map((item) => (
            <Card
              key={`cardId-${item.id}`}
              className="flex flex-row items-center p-4  bg-gray-50  shadow-gray-300 border-1 border-gray-100"
            >
              <div className="ml-4  flex justify-end flex-1 gap-2.5 text-right">
                {checkIsAdmin(item) && (
                  <BadgeDemo text={"Admin"} styles={"bg-red-400 text-white"} />
                )}
                <h3 className="text-lg font-medium">
                  {`${item?.member?.name} ${item?.member?.family}`}
                </h3>
              </div>
              <div className="relative flex justify-center items-center w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/user.webp"
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
