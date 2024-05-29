"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Role } from "@/interfaces/others.interface";
import { getUser } from "@/data/user/getUser";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import {
  resendForgetPasswordService,
  changePasswordService,
  forgetPasswordService,
  resetPasswordService,
  registerUserService,
  logoutUserService,
  loginUserService,
  updateUserService,
} from "./authService";

const config: Partial<ResponseCookie> | undefined = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export async function registerUserAction(_: any, formData: FormData) {
  const getFormData = {
    gender: formData.get("gender")?.toString() as Role,
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const responseData = await registerUserService(getFormData);

  if (!responseData) {
    return {
      data: {
        status: false,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (responseData?.errors || !responseData?.status) {
    return {
      data: {
        status: false,
        message: responseData?.message,
      },
    };
  }

  revalidateTag("reportedTo");

  return {
    data: {
      ...responseData,
      message: "Registered successfully. Login Now!",
    },
  };
}

export async function loginUserAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const responseData = await loginUserService(getFormData);

  if (responseData?.data) {
    cookies().set("token", responseData?.data?.accessToken, config);
    cookies().set("refreshToken", responseData?.data?.refreshToken, config);
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function logoutUserAction() {
  const responseData = await logoutUserService();

  if (!responseData) {
    return {
      data: {
        status: false,
        code: responseData.code,
        message: "Invalid Token",
      },
    };
  }

  if (!responseData?.status) {
    return {
      data: {
        status: false,
        code: responseData?.code,
        message: "Invalid Token",
      },
    };
  }

  if (responseData?.status) {
    cookies().delete("token");
    cookies().delete("refreshToken");
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function changePasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const user = await getUser();

  if (!user?.userId) {
    redirect("/login");
  }

  const getFormData = {
    id: user.userId,
    oldpassword: formData.get("Current Password")?.toString() || "",
    newpassword: formData.get("New Password")?.toString() || "",
  };

  const responseData = await changePasswordService(getFormData);

  if (responseData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function forgetPasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    email: formData.get("email")?.toString() || "",
  };

  const responseData = await forgetPasswordService(getFormData);

  if (responseData?.code === 500) {
    return {
      data: {
        ...responseData,
        message: "An error occurred. Try again!",
      },
    };
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function resendForgetPasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    email: formData.get("email")?.toString() || "",
  };

  const responseData = await resendForgetPasswordService(getFormData);

  if (responseData?.code === 500) {
    return {
      data: {
        ...responseData,
        message: "An error occurred. Try again!",
      },
    };
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function resetPasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    otp: formData.get("otp")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const responseData = await resetPasswordService(getFormData);

  return {
    data: {
      ...responseData,
    },
  };
}

export async function updateUserAction(
  _: any,
  formData: FormData
): Promise<any> {
  const user = await getUser();

  if (!user?.userId) {
    redirect("/login");
  }

  const getFormData = {
    id: user.userId,
    username: formData.get("Username")?.toString() || "",
  };

  const responseData = await updateUserService(getFormData);

  if (responseData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  revalidateTag("userData");
  revalidateTag("reportedTo");

  return {
    data: {
      ...responseData,
    },
  };
}
