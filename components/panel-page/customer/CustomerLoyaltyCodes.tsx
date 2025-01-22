import { getUserLoyaltyCodes } from "@/lib/queries";

const CustomerLoyaltyCodes = async ({ userId }: { userId: string }) => {
  const loyaltyCodes = await getUserLoyaltyCodes(userId);
  if (loyaltyCodes.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 p-4 shadow-md rounded-xl bg-white h-fit">
      <h3 className="uppercase text-xl font-medium text-bronzelog">
        Twoje kody lojalnościowe
      </h3>
      <div className="flex flex-col gap-2">
        {loyaltyCodes.map((code) => (
          <div key={code.id} className="flex justify-center items-center gap-2">
            <span
              className={`${!code.used ? "text-green-600" : "text-red-600"}`}
            >
              {code.code}
            </span>
            <span>{code.discount_percentage}%</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerLoyaltyCodes;
