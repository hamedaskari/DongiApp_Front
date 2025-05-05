"use client";

import GetGroupMembers from "./GetGroupMembers";
import ModalAddUser from "./ModalAddUser";

export default function MembersPage() {
  return (
    <div>
      {/* list of members group */}
      <GetGroupMembers />
      {/* modal for add user to group */}
      <ModalAddUser />
    </div>
  );
}
