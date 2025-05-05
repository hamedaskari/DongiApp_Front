import { useUser } from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { BadgeDemo } from "@/util/CustomBadge";

export function CardWithForm({ item, index, handleShareAction, isPending }) {
  const {
    share: {
      group: {
        creator: { id: creatorId },
      },
      isAccepted,
    },
  } = item;
  const { user } = useUser();
  const isAdmin = user?.id === creatorId;

  return (
    <Card
      className="flex flex-col bg-gray-100  justify-between h-full mt-5 shadow-gray-100    p-4 rounded-xl"
      dir="rtl"
    >
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className=" font-bold text-gray-800">تراکنش {index}</h2>
          <span className="text-sm bg-yellow-200 text-yellow-700 rounded-full px-3 py-1">
            {item?.share?.amount.toLocaleString()} تومان
          </span>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {item?.share?.description || "توضیحی ندارد"}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm space-y-3 text-gray-800">
        <div>
          <span className="font-semibold text-gray-700">مادر خرج:</span>{" "}
          <span>
            {item?.share?.spender?.name} {item?.share?.spender?.family}
          </span>
        </div>

        <div>
          <span className="font-semibold text-gray-700">اعضای تراکنش:</span>
          {item?.users?.length > 0 ? (
            <ul className="mt-1 pr-4 list-disc space-y-1 marker:text-amber-600">
              {item?.users.map((u, i) => (
                <li key={`${u?.user?.id}-${i}-user`}>
                  <span className="font-medium">
                    {u.user.name} {u.user.family}
                  </span>
                  {" - "}
                  {u.amount.toLocaleString()} تومان
                  {u.isDebtor && (
                    <span className="text-red-500 mr-1 font-semibold">
                      (بدهکار)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              هیچ عضوی برای نمایش وجود ندارد.
            </p>
          )}
        </div>
      </CardContent>

      {
        <CardFooter className="flex justify-start gap-3 mt-4">
          {!isAccepted && isAdmin ? (
            <>
              <Button
                disabled={isPending}
                onClick={() =>
                  handleShareAction({ id: item.share.id, action: "reject" })
                }
                variant="outline"
                className="border-red-500 cursor-pointer text-red-600 hover:bg-red-100"
              >
                رد
              </Button>
              <Button
                disabled={isPending}
                onClick={() =>
                  handleShareAction({ id: item.share.id, action: "accept" })
                }
                className="bg-green-500 cursor-pointer hover:bg-green-700 text-white"
              >
                قبول
              </Button>
            </>
          ) : isAccepted ? (
            <BadgeDemo
              text="تایید شده توسط ادمین"
              styles="bg-green-700 text-white"
            />
          ) : (
            <BadgeDemo text="در انتظار تایید ادمین" styles={"bg-red-400"} />
          )}
        </CardFooter>
      }
    </Card>
  );
}
