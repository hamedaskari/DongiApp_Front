"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
const data = [
  {
    id: 11,
    url: "debts",
    text: "بدهی ها",
  },
  {
    id: 12,
    url: "transactions",
    text: "تراکنش ها",
  },
  {
    id: 13,
    url: "members",
    text: "اعضا",
  },
];
export function TabsDemo({ groupId }) {
  const pathname = usePathname();

  return (
    <Tabs defaultValue="account" className="w-full p-5 flex justify-center">
      <TabsList className="grid w-full grid-cols-3">
        {data.map((item) => (
          <Link
            key={item.id}
            className={`text-center flex justify-center items-center h-full rounded-[10px] ${
              pathname === `/group/${groupId}/${item.url}`
                ? "bg-gray-200 shadow-gray-100"
                : "bg-gray-50"
            }`}
            href={`/group/${groupId}/${item.url}`}
          >
            {item.text}
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
