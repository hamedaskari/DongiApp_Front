"use client";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface DialogDemoProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  DialogTriggerJSX: React.ReactNode;
  isLoading?: boolean;
  modalState?: boolean;
  showOverlay?: boolean;
}

export function DialogDemo({
  title,
  description = "",
  children,
  DialogTriggerJSX,
  modalState,
  isLoading,
}: DialogDemoProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean | any>(false);

  function handleOpenChange(open: boolean) {
    if (isLoading) {
      if (!open) {
        return;
      }
    }
    setIsModalOpen(open);
  }
  useEffect(() => setIsModalOpen(modalState), [modalState]);

  return (
    <>
      <Dialog onOpenChange={(e) => handleOpenChange(e)} open={isModalOpen}>
        <DialogTrigger asChild>
          <div className="w-full">{DialogTriggerJSX}</div>
        </DialogTrigger>
        <DialogContent className="py-15  flex flex-col sm:max-w-[425px]">
          <DialogHeader className="sm:text-right">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="gap-4">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
