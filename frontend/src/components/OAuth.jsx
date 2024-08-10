import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { app } from "../firebase";
import { useGoogleAuthMutation } from "../redux/api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const [googleAuth] = useGoogleAuthMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await googleAuth({
        username: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });
      dispatch(setCredentials({ ...res.data }));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
