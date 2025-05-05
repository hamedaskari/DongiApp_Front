"use client";

import Loading from "@/components/loadings/Loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetGroups } from "@/hooks/useGetGroups";
import { PaginationDemo } from "@/util/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PopoverDemo } from "./PopOver";

export default function GetGruops() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const router = useRouter();
  const { groupData, isLoading } = useGetGroups(page);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    setPage(newPage);
  };

  if (isLoading) return <Loading />;

  const numberOfItems = groupData?.data?.length <= 0;
  const numberOfPages = groupData?.last_page;

  return (
    <div className="p-3 lg:p-9 md:p-5 space-y-4 overflow-y-auto">
      {numberOfItems ? (
        <span className="w-full flex justify-center text-center">
          شما هنوز گروهی ندارید لطفا از پایین صفحه یک گروه ایجاد کنید
        </span>
      ) : (
        <>
          {groupData?.data?.map((item) => (
            <Card
              key={`cardId-${item.id}`}
              className="flex bg-gray-50 border-sky-50 shadow-gray-300 flex-row items-center p-4"
            >
              <PopoverDemo groupID={item.id} />
              <Button
                type="button"
                className="transition-all  duration-300 cursor-pointer text-white hover:bg-blue-900  bg-blue-400"
                size="sm"
              >
                <Link href={`/group/${item?.group?.id}/members`}>مشاهده</Link>
              </Button>
              <div className="ml-4 flex justify-end flex-1 gap-2.5 text-right">
                <h3 className="text-lg font-medium">{item?.group?.name}</h3>
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

      <PaginationDemo
        page={page}
        setPage={handlePageChange}
        pages={numberOfPages}
      />
    </div>
  );
}
