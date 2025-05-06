import ModalTransActions from "@/components/TransActions/ModalTransActions";
import TransActionsBox from "@/components/TransActions/TransActionsBox";

export default function page() {
  return (
    <div>
      {/* Show TransActions */}
      <TransActionsBox />

      {/* Modal Create TransActions */}
      <ModalTransActions />
    </div>
  );
}
