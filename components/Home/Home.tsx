"use client";
import GetGroups from "../Group/GetGroups";
import ModalCreateGroup from "../Group/ModalCreateGroup";

export default function Home() {
  return (
    <div className="relative">
      <h3 className="w-full text-center p-5 text-4xl">گروه ها</h3>

      {/* Group List Section */}
      <GetGroups />

      {/* Dialog to create a new group */}
      <ModalCreateGroup />
    </div>
  );
}
