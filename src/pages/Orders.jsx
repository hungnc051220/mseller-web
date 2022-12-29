import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../api/apiSlice";
import { formatMoney } from "../utils/common";

const Orders = () => {
    const navigate = useNavigate();
  const { data } = useGetOrdersQuery({});
  console.log(data);
  return (
    <div className="pb-32">
      <h1 className="text-3xl font-semibold">Danh sách đơn hàng</h1>
      <div className="mt-6 space-y-6">
        {data?.content.map((item) => {
          return (
            <div
              className="cursor-pointer space-y-2 rounded-lg bg-white p-4 shadow hover:shadow-md"
              onClick={() =>
                navigate("/order-detail", { state: { orderId: item.id } })
              }
            >
              <div className="flex items-center justify-between">
                <p className="rounded-lg bg-primary p-2 text-white">
                  {item.floor.name} - {item.table.name}
                </p>
                <p>{item.status}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  {dayjs(item.logs[0].actionDatetime).format(
                    "HH:mm DD/MM/YYYY"
                  )}
                </p>
                <p>Nhân viên: Không có</p>
              </div>
              <div className="flex items-center justify-between">
                <p>1 sản phẩm</p>
                <p>{formatMoney(item.totalNetPrice)} đ</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
