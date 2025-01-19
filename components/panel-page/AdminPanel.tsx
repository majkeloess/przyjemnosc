import { User } from "@/types/types";

export default function AdminPanel({ userData }: { userData: User }) {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-2xl w-full px-4 h-[80dvh] mt-4">
      <h1 className="text-2xl font-medium uppercase text-bronzelog text-center">
        Panel administracyjny
      </h1>
    </div>
  );
}
