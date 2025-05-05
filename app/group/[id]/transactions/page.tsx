import TransactionForm from "@/components/Form/TransactionForm";
import TransActionsBox from "@/components/Group/TransActionsBox";
import { DialogDemo } from "@/util/Modal";

export default function page() {
  return (
    <div>
      {/* Show TransActions */}
      <TransActionsBox />

      {/* Modal Create TransActions */}
      <DialogDemo
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
    </div>
  );
}
