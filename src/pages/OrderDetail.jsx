import { Avatar, Button } from "antd";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByTableQuery } from "../api/apiSlice";
import { formatMoney } from "../utils/common";

const OrderDetail = () => {
  const location = useLocation();
  const { tableId } = location.state;
  const navigate = useNavigate();

  const { data } = useGetOrderByTableQuery({
    tableId,
    sortBy: "id",
    direction: "DESC",
  });

  return (
    <div className="-m-6 pb-32">
      <div className="shado-sm bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="rounded-lg bg-primary py-1 px-2 text-lg font-semibold text-white">
            {data?.floor.name} - {data?.table.name}
          </p>
          <p>{data?.status}</p>
        </div>
        <div className="mt-2 space-y-1">
          <p>Phương thức thanh toán: {data?.paymentType}</p>
          <p>Thời gian vào: {data?.logs[0]?.actionDatetime}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 bg-white p-6 shadow-sm">
        <Avatar size="large" />
        <p className="text-xl font-medium">Nhân viên</p>
      </div>

      <div className="mt-6 space-y-6 bg-white p-6 shadow-sm">
        {data?.foods.map((item) => {
          return (
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt="food"
                className="h-32 w-32 rounded-lg"
              />
              <div className="flex-1">
                <p className="text-xl font-semibold">{item.name}</p>
                <div className="flex items-center justify-between">
                  <p className="mt-2 text-lg font-medium text-orange-600">
                    {formatMoney(item.price)} đ
                  </p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-[#FAF6F3] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Thành tiền</p>
          <p className="text-lg font-semibold">
            {formatMoney(data?.totalNetPrice)} đ
          </p>
        </div>
      </div>

      <div className="p-6">
        <Button
          className="h-12 w-full bg-primary text-xl font-semibold text-white"
          size="large"
          onClick={() => navigate(`/payment/${data?.id}`)}
        >
          Thanh toán ngay
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;
