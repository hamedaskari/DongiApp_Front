"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import { FaList } from "react-icons/fa6";

export default function MenuItem() {
  const [isMenuOPen, setIsMenuOpen] = useState<true | false>(false);

  return (
    <Sheet open={isMenuOPen} onOpenChange={(e: boolean) => setIsMenuOpen(e)}>
      <SheetTrigger asChild>
        <Button
          className="bg-gray-200 hover:bg-gray-200  cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          <div>
            <FaList color="black" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white border-0 ">
        <SheetHeader className="text-center bg-blue-900 text-white">
          <SheetTitle className="text-white">منو</SheetTitle>
        </SheetHeader>
        <div className="w-full gap-4 p-4">
          <Link href={"/"}>
            <Button
              className="duration-300 shadow-2xl text-white hover:bg-blue-900 cursor-pointer transition-all  w-full bg-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              صفحه اصلی
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
