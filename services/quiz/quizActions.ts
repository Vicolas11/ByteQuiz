"use server";
import { createQuizService, submitQuizService } from "./quizService";
import { SubmitQuizResp } from "@/interfaces/response.interface";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createQuizAction(_: any, formData: FormData) {
  const getFormData = {
    data: formData.get("concept") as string,
  };

  const concept = { concept: getFormData.data };

  const respData = await createQuizService(concept);

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (respData?.error || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Create Quiz.",
      },
    };
  }

  revalidateTag("usersQuiz");

  return {
    data: {
      ...respData,
      compete: respData.other.compete,
    },
  };
}

export async function submitQuizAction(_: any, formData: FormData) {
  const getFormData = {
    data: JSON.parse(formData.get("data") as string),
  };

  const respData = await submitQuizService(getFormData.data);

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (respData?.error || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Submit Quiz.",
      },
    };
  }

  revalidateTag("userData");
  revalidateTag("usersQuiz");
  // revalidateTag("quiz");

  return {
    data: {
      ...(respData as SubmitQuizResp),
      compete: respData.other.compete,
    },
  };
}
