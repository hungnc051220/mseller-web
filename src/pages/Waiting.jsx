import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import {
  useCompleteFoodMutation,
  useGetFoodWaitingQuery,
} from "../api/apiSlice";

const Waiting = () => {
  const { data } = useGetFoodWaitingQuery({
    pageSize: 1000,
    pageNumber: 0,
    direction: "ASC",
    sortBy: "id"
  });
  const [completeFood, { isLoading: isLoadingComplete }] = useCompleteFoodMutation();

  const onComplete = async (data) => {
    try {
      const response = await completeFood(data).unwrap();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="items-cneter flex w-full flex-col pb-32">
      <h1 className="mb-6 w-full text-center text-3xl">Hôm nay</h1>
      <div className="space-y-6">
        {data?.content.map((item) => {
          return (
            <div className="cursor-pointer bg-white p-6 shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <p>{dayjs(item.updatedAt).format("HH:mm DD/MM/YYYY")}</p>
                <p>{item.position}</p>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt="food"
                  className="h-32 w-32 overflow-hidden rounded-lg"
                />
                <div>
                  <p className="text-xl font-medium">{item.name} (x{item.quantity})</p>
                  <p>Ghi chú: {item.note}</p>
                </div>
              </div>

              <div className="flex justify-end gap-6">
                <Button className="h-14 w-1/5 text-lg">Sửa</Button>
                <Button
                  className="h-14 w-1/5 bg-primary text-lg text-white"
                  onClick={() =>
                    onComplete({
                      orderId: item.orderId,
                      foodId: item.id,
                      index: item.index,
                    })
                  }
                >
                  Hoàn tất
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Waiting;
