import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { userInfo } = useSelector(state => state.auth);
  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer">
          <img
            src={userInfo.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={userInfo.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={userInfo.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
