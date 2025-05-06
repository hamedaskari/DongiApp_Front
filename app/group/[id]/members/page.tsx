import GetGroupMembers from "@/components/Group/GetGroupMembers";
import ModalAddUser from "@/components/Group/ModalAddUser";

export default function page() {
  return (
    <div>
      {/* list of members group */}
      <GetGroupMembers />
      {/* modal for add user to group */}
      <ModalAddUser />
    </div>
  );
}
