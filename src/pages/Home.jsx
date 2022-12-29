import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useGetFloorsQuery } from "../api/apiSlice";
import { classNames } from "../utils/common";

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFloorsQuery();
  const [currentFloor, setCurrentFloor] = useState(null);

  return (
    <div className="pb-32">
      <div className="flex items-center justify-center gap-4">
        <div className="w-[500px] rounded-lg bg-white py-5 text-center text-xl shadow-md">
          Số bàn trống:{" "}
          <span className="font-semibold text-primary">
            {data?.tableEmptyCount}
          </span>
        </div>
        <div className="w-[500px] rounded-lg bg-white py-5 text-center text-xl shadow-md">
          Đang sử dụng:{" "}
          <span className="font-semibold text-orange-600">
            {data?.tableTotalCount}
          </span>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-start gap-8">
        <div
          className={classNames(
            !currentFloor && "text-primary",
            "cursor-pointer text-lg font-medium"
          )}
          onClick={() => setCurrentFloor(null)}
        >
          Tất cả
        </div>
        {data?.floors.map((item) => {
          return (
            <div
              className={classNames(
                currentFloor === item.id ? "text-primary" : "",
                "cursor-pointer text-lg font-medium"
              )}
              onClick={() => setCurrentFloor(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      <div className="-mx-6 space-y-8 py-6">
        {data?.floors
          ?.filter((x) => (currentFloor ? x.id === currentFloor : x))
          .map((item) => (
            <div key={item.id} className="px-6">
              <div className="flex items-center justify-between">
                <h4 className="mb-4 text-2xl font-semibold">{item.name}</h4>
                <p>
                  Còn trống:{" "}
                  <span className="font-semibold text-primary">02</span>
                </p>
              </div>
              <div className="grid grid-cols-4 gap-8">
                {item.tables.map((table) => {
                  return (
                    <div
                      className="overflow-hidden rounded-xl bg-white shadow"
                      onClick={() =>
                        !table.status
                          ? navigate("/order/create")
                          : navigate("/order", {state: { tableId: table.id}})
                      }
                    >
                      <div
                        className={classNames(
                          !table.status ? "bg-primary" : "bg-gray-400",
                          "border-b border-gray-100 p-4 text-center text-xl font-semibold  text-white"
                        )}
                      >
                        {table.name}
                      </div>
                      <div className="flex flex-col items-center justify-center p-4">
                        {!table.status ? (
                          <AiOutlineCheckCircle
                            size={64}
                            color="#2DB894"
                            className="mb-6"
                          />
                        ) : (
                          <BiTimeFive
                            size={64}
                            color="#8E8E8E"
                            className="mb-6"
                          />
                        )}
                        <p className="text-lg">
                          {!table.status ? "Sẵn sàng" : "Đang sử dụng"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
