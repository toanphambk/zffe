"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, TextInput, Button, Text } from "@tremor/react";
import { HiOutlineMail, HiUserCircle } from "react-icons/hi";
import { SetEmail, SetPassword } from "@/redux/UI/loginSlice";
import { useRouter } from "next/navigation";
import { removeAuthData } from "@/redux/data/authSlice";
import { useEffect } from "react";
import { useAuthControllerAdminLoginMutation } from "@/redux/services/api";

export default function Login() {
  const [loginMutation] = useAuthControllerAdminLoginMutation();
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.authReducer);
  const { isLoading, isError, email, password } = useAppSelector(
    (state) => state.loginReducer
  );
  const router = useRouter();

  useEffect(() => {
    if (token || user) {
      dispatch(removeAuthData());
    }
  }, []);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await loginMutation({
        authEmailLoginDto: { email, password },
      }).unwrap()
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="flex items-center w-1/4 mx-auto">
      <form className="flex flex-col w-full" onSubmit={handleSignIn}>
        <div className="flex flex-row items-center mx-auto mb-4">
          <HiUserCircle className="text-6xl text-blue-600 "></HiUserCircle>
          <Text className="ml-2 font-sans text-2xl font-bold text-black ">
            Log In
          </Text>
        </div>
        <TextInput
          className="mb-4"
          icon={HiOutlineMail}
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(SetEmail(e.target.value))}
        />
        <TextInput
          className="mb-2"
          type="password"
          error={isError ? true : false}
          value={password}
          onChange={(e) => dispatch(SetPassword(e.target.value))}
        />
        <div className="flex flex-row justify-between w-full mt-2 mb-3">
          <Text className="w-full mb-5 text-sm text-black text-begin hover:cursor-pointer">
            Forgot password ?
          </Text>
          <Button className="h-10 w-28" loading={isLoading} type="submit">
            Sign in
          </Button>
        </div>
      </form>
    </Card>
  );
}
