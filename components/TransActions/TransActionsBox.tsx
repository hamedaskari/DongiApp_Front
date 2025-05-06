"use client";
import Loading from "@/components/loading/Loading";
import { useTransAction } from "@/hooks/useTransAction";
import { CardWithForm } from "./TransActionsCard";

export default function TransActionsBox() {
  const { isPendingRA, isLoadingList, transActionList, handleRATransActions } =
    useTransAction();

  if (isLoadingList) return <Loading />;

  const transactions = transActionList?.data ?? [];

  if (transactions.length === 0) {
    return (
      <span className="w-full flex justify-center">تراکنشی وجود ندارد</span>
    );
  }

  return (
    <div className="grid p-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {transactions.map((item, index) => (
        <CardWithForm
          handleShareAction={handleRATransActions}
          key={item?.share?.id || index}
          item={item}
          index={index + 1}
          isPending={isPendingRA}
        />
      ))}
    </div>
  );
}
