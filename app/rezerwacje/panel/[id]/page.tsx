import { getUser } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

import AdminPanel from "@/components/panel-page/AdminPanel";
import CustomerPanel from "@/components/panel-page/CustomerPanel";

export default async function PanelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const userData = await getUser(id);

    if (!userData) {
      redirect("/rezerwacje");
    }

    if (userData.type === "admin") {
      return <AdminPanel userData={userData} />;
    }

    return <CustomerPanel userData={userData} />;
  } catch (error) {
    console.error("Error:", error);
    redirect("/rezerwacje");
  }
}
