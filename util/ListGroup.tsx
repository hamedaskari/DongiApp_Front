"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { PopoverDemo } from "../components/Group/PopOver";
import { BadgeDemo } from "./CustomBadge";
import { PaginationDemo } from "./Pagination";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../components/loadings/Loading";

export default function MembersList({
  queryFn = () => null,
  queryKey,
  buttonLink,
  buttonText,
  buttonTextH3,
  image,
  badgeText,
  badgeStyles,
  badgeCondition,
  conditionalRendering = () => true,
  variantBtn = "bg-blue-400",
  render = "group",
  buttonsEvent = () => null,
  getQuery,
}: any) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const pageFromUrl = Number(searchParams.get("page") || 1);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const isGroup = render === "Getgroups" || render === "GetMember-groups";

  const { data: groupData, isLoading } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey, page],
    queryFn: () => queryFn(page),
    enabled: isGroup,
  });

  const getQueryData =
    render === "notifGroup" ? queryClient.getQueryData([getQuery]) : null;

  const latestData = getQueryData || groupData;

  if (isLoading) return <Loading />;

  const numberOfItems = latestData?.data?.length <= 0;
  const numberOfPages = latestData?.last_page;

  return (
    <div
      className={`p-3 lg:p-9 md:p-5 space-y-4 overflow-y-auto ${
        render === "notifGroup" ? "max-h-96" : ""
      }`}
    >
      {numberOfItems ? (
        <span className="w-full flex justify-center text-center">
          داده‌ای برای نمایش وجود ندارد
        </span>
      ) : (
        <>
          {!isGroup && (
            <span className="flex w-full justify-end">
              تعداد: {latestData?.data?.length}
            </span>
          )}

          {latestData?.data?.map(
            (item) =>
              conditionalRendering(item) && (
                <Card
                  key={`cardId-${item.id}`}
                  className="flex flex-row items-center p-4"
                >
                  {render === "GetMember-groups" && (
                    <PopoverDemo groupID={item.id} />
                  )}

                  {buttonText.map((_, i) => (
                    <Button
                      onClick={() => buttonsEvent(_, item.id)}
                      key={`buttonModal-${item.id}-${i}`}
                      type="button"
                      className={`transition-all duration-300 cursor-pointer hover:bg-blue-900 ${
                        Array.isArray(variantBtn) ? variantBtn[i] : variantBtn
                      }`}
                      size="sm"
                    >
                      {buttonLink ? (
                        <Link href={buttonLink(item)}>{buttonText[i]}</Link>
                      ) : (
                        buttonText[i]
                      )}
                    </Button>
                  ))}

                  <div className="ml-4 flex justify-end flex-1 gap-2.5 text-right">
                    {badgeText && badgeCondition(item) && (
                      <BadgeDemo text={badgeText} styles={badgeStyles} />
                    )}
                    <h3 className="text-lg font-medium">
                      {buttonTextH3(item)}
                    </h3>
                  </div>

                  <div className="relative flex justify-center items-center w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={image}
                      alt={item.id}
                      width={48}
                      height={48}
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                </Card>
              )
          )}
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
