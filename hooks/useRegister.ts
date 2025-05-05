"use client";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegister = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const { mutateAsync: handleRegister, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const finalData = {
        ...data,
        baleId: "33227",
      };
      const response = await axiosInstance.post("/auth/register", finalData);
      return response;
    },

    onSuccess: (response) => {
      if (response?.status === 201) {
        toast.success("کاربر با موفقیت ساخته شد");

        const userData = response.data?.data?.user;
        setUser(userData);
        document.cookie = `token=${response.data?.data?.token}; path=/;`;

        router.push("/");
      }
    },
    onError: (error: any) => {
      toast.error("مشکلی پیش آمده.");
      console.error(
        "❌ Error submitting form:",
        error.response?.data || error.message
      );
    },
  });

  return { handleRegister, isPending };
};
