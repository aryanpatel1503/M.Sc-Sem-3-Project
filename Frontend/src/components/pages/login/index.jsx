import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";
import loginimg from "../../../assets/login1.png";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { borderForField } from "../../lib/commonFunctions";

const Login = () => {
  const defaultValues = {
    user_email: "",
    user_password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const navigate = useNavigate();

  const onSubmitData = (values) => {
    console.log(values);
  };

  const onSubmitError = () => {};

  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit(onSubmitData, onSubmitError)();
  };
  return (
    <div
      className=" mx-auto flex flex-wrap justify-center items-center h-screen"
      style={{
        background: "linear-gradient(to top, #198754 0%, #6c757d 100%)",
      }}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center h-[395px] bg-white shadow-lg rounded-tl-lg rounded-bl-lg">
        <img src={loginimg} alt="login" className="object-cover rounded-lg" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 h-[395px] bg-[#f5f5f5] shadow-lg rounded-tr-lg rounded-br-lg px-7 py-4">
        <Typography variant="h4" className="text-center">
          Login
        </Typography>

        <Card color="transparent" shadow={false} className="w-full">
          <form className="mt-5 mb-2 w-[80%] flex flex-col self-center">
            <div className="mb-1 flex flex-col gap-4">
              {/* <div>
                <Typography
                  color="blue-gray"
                  className="text-md font-medium"
                >
                  Username
                </Typography>
                <Controller
                  name="user_name"
                  control={control}
                  rules={{ required: "Username is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      size="lg"
                      placeholder="username"
                      onChange={onChange}
                      value={value}
                      className=" border-t-blue-gray-200 focus:!border-[#5479F7]"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      error={errors.user_name}
                    />
                  )}
                />
                {errors.user_name && (
                  <Typography color="red" className="text-md font-medium">
                    {errors.user_name.message}
                  </Typography>
                )}
              </div> */}

              <div>
                <Typography color="blue-gray" className="text-sm font-medium">
                  Email
                </Typography>
                <Controller
                  name="user_email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      placeholder="name@mail.com"
                      className={borderForField(errors.user_email)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      error={errors.user_email}
                    />
                  )}
                />
                {errors.user_email && (
                  <Typography color="red" className="text-md font-medium">
                    {errors.user_email.message}
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="blue-gray" className="text-sm font-medium">
                  Password
                </Typography>
                <Controller
                  name="user_password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      size="lg"
                      placeholder="********"
                      className={borderForField(errors.user_password)}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      error={errors.user_password}
                    />
                  )}
                />
                {errors.user_password && (
                  <Typography color="red" className="text-md font-medium">
                    {errors.user_password.message}
                  </Typography>
                )}
              </div>
            </div>

            <Button
              variant="filled"
              className="mt-6 bg-[#5479F7]"
              fullWidth
              type="submit"
              onClick={handleSignIn}
            >
              sign in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              New user? Click here to {""}
              <NavLink className="font-semibold text-[#5479F7]" to="/signup">
                Register
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;