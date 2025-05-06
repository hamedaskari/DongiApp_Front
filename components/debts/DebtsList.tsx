"use client";
import { useUser } from "@/context/UserContext";
import { useGetDebts } from "@/hooks/useGetDebts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Loading from "@/components/loading/Loading";

export default function DebtList() {
  const { user } = useUser();
  console.log(user);
  //Get Debts
  const { debtsData, isPending } = useGetDebts();

  if (isPending) return <Loading />;
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      dir="rtl"
    >
      {debtsData?.data?.map((entry, index) => {
        const debt = entry[0];
        const fullName = `${user?.name} ${user?.family}`.trim();
        const isDebtor = debt.from.trim() === fullName;

        return (
          <Card
            key={index}
            className="shadow-lg  rounded-xl p-4 flex flex-col justify-between"
          >
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-800">
                بدهی {index + 1}
              </h2>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">از:</span> {debt.from}
              </p>
              <p>
                <span className="font-semibold">به:</span> {debt.to}
              </p>
              <p>
                <span className="font-semibold">مبلغ:</span>{" "}
                {debt.amount.toLocaleString()} تومان
              </p>
            </CardContent>

            {isDebtor && (
              <CardFooter className="mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  تسویه بدهی
                </Button>
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
