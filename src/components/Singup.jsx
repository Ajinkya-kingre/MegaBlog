import React, { useState } from "react";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice.js";

const Singup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const create = async (data) => {
    setErr("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrUser(userData);
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setErr(err.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {err  && <p className="text-red-600 mt-8 text-center">{err}</p>}
      
      <form onSubmit={handleSubmit(create)}></form>
      
      
      </div>
    </div>
  );
};

export default Singup;
