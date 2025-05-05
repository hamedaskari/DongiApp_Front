import { TabsDemo } from "@/components/Group/TabsMenu";

export default async function Page({ params, children }: any) {
  const { id } = await params;

  return (
    <div>
      {<TabsDemo groupId={id} />}
      {children}
    </div>
  );
}
