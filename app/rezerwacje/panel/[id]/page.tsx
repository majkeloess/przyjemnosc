import { getTableCapacity, getUser } from "@/lib/queries";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/panel-page/admin/AdminPanel";
import CustomerPanel from "@/components/panel-page/customer/CustomerPanel";

export default async function PanelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const userData = await getUser(id);
    const capacities = await getTableCapacity();
    if (!userData) {
      redirect("/rezerwacje");
    }
    const Panel = userData.type === "admin" ? AdminPanel : CustomerPanel;

    return <Panel userData={userData} capacities={capacities} />;
  } catch (error) {
    console.error("Error:", error);
    redirect("/rezerwacje");
  }
}
