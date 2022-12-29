import React, { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../api/apiSlice";
import { images } from "../constants";
import { Button, Checkbox, Form, Input, message } from "antd";

const Login = () => {
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [login, { isLoading }] = useLoginMutation();
    const [isError, setIsError] = useState("");

    const onFinish = async (data) => {
        try {
          const userData = await login(data).unwrap();
          dispatch(setCredentials({ ...userData }));
          navigate(location?.state?.from?.pathname || "/");
        } catch (error) {
          if (error.status === 401) {
            setIsError("error");
            messageApi.open({ type: "error", content: error?.data?.title });
          }
        }
      };

      
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tr from-green-500 to-teal-500 p-4">
      <div className="flex h-[680px] w-[960px] flex-wrap overflow-hidden rounded-[10px] bg-white">
        <div className="flex flex-1 items-center justify-center">
          <img src={images.logo} alt="logo" className="w-60"/>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-2/3">
            <h1 className="mb-14 text-center text-4xl font-bold">Đăng nhập</h1>
            <Form onFinish={onFinish} className="mt-10">
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: t("message.validation.required", {
                    field: t("phoneNumber"),
                  }),
                },
              ]}
              className="mb-3"
              validateStatus={isError}
            >
              <Input
                prefix={<AiOutlineUser />}
                placeholder={t("phoneNumber")}
                size="large"
                className="text-sm h-11"
                ref={inputRef}
                onChange={() => setIsError(undefined)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("message.validation.required", {
                    field: t("password"),
                  }),
                },
              ]}
              className="mb-3"
              validateStatus={isError}
            >
              <Input.Password
                prefix={<AiOutlineLock />}
                type="password"
                placeholder={t("password")}
                size="large"
                className="text-sm h-11"
                onChange={() => setIsError(undefined)}
              />
            </Form.Item>
            <Form.Item className="mb-10">
              <Form.Item valuePropName="checked" noStyle>
                <Checkbox>{t("rememberMe")}</Checkbox>
              </Form.Item>

              <a className="float-right text-orange-400" href="#">
                {t("forgotPassword")}
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="font-medium h-12 px-5 w-full"
                loading={isLoading}
              >
                {t("login")}
              </Button>
            </Form.Item>
          </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login