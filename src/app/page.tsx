"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { removeAuthData } from "@/redux/data/authSlice";
import { useAuthControllerMeQuery } from "@/redux/services/api";

export default function RootComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, isError } = useAuthControllerMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isError) {
    dispatch(removeAuthData());
    return router.push("/login");
  }

  return router.push("/home");
}
