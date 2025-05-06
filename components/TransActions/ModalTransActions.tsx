"use client";
import { useTransAction } from "@/hooks/useTransAction";
import TransactionForm from "../Form/TransactionForm";
import { DialogDemo } from "../Modal";

export default function ModalTransActions() {
  const { isSuccessCreateTransActions } = useTransAction();
  return (
    <DialogDemo
      modalState={isSuccessCreateTransActions}
      description={"دنگ را بسازید و منتظر بمانید تا ادمین تایید کند."}
      title={"ایجاد دنگ"}
      DialogTriggerJSX={
        <div className="bg-green-400 text-3xl fixed rounded-full w-15 h-15 bottom-5 left-5 flex items-center justify-center text-white cursor-pointer">
          +
        </div>
      }
    >
      <TransactionForm />
    </DialogDemo>
  );
}
