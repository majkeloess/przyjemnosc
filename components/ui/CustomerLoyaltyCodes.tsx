import { getUserLoyaltyCodes } from "@/lib/queries";

const CustomerLoyaltyCodes = async ({ userId }: { userId: string }) => {
  const loyaltyCodes = await getUserLoyaltyCodes(userId);
  if (loyaltyCodes.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <h3 className="uppercase text-xl font-medium text-bronzelog">
        Twoje kody lojalnościowe
      </h3>
      <div>
        {loyaltyCodes.map((code) => (
          <div key={code.id}>{code.code}</div>
        ))}
      </div>
    </section>
  );
};

export default CustomerLoyaltyCodes;
