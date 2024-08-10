import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSigninMutation } from "../redux/api/auth";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signin, { isLoading, error }] = useSigninMutation();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await signin(formData).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success("Successfully logged in");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        <div className="flex-1">
          <Link
            to="/"
            className="self-center text-4xl font-bold whitespace-nowrap dark:text-white"
          >
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Ali's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Logging...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
