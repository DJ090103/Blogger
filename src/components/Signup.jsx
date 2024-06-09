import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  console.log("i am in Signup page");
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const createAccount = async (data) => {
    console.log("i am creating account");
    seterror("");
    try {
      const userdata = await authService.createAccount(data);
      if (userdata) {
        const user = await authService.getCurrentUser();

        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (err) {
      seterror(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/50">
          Already have any account
          <Link
            to="/login"
            className="frnt-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>

        {error && <p className=" text-center text-red-600 mt-8">{error}</p>}

        <form onSubmit={handleSubmit(createAccount)}>
          <div className=" space-y-5 ">
            <Input
              label="Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Enter valid Email address",
                },
              })}
            />

            <Input
              label="password"
              type="password"
              placeholder="enter your Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button children="Submit" type="Submit" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
