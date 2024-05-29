"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  createCompetitionService,
  deleteCompetitionService,
  joinedCompetitionService,
  submitCompetitionService,
  updateCompetitionService,
} from "./competitionService";

export async function createCompetitionAction(_: any, formData: FormData) {
  const getFormData = {
    data: JSON.parse(formData.get("data") as string),
  };

  const respData = await createCompetitionService(getFormData.data);

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

  if (respData?.errors || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Create Competition.",
      },
    };
  }

  revalidateTag("competitions");

  return {
    data: {
      ...respData,
    },
  };
}

export async function deleteCompetitionAction(_: any, formData: FormData) {
  const getFormData = {
    id: formData.get("id")?.toString() || "",
  };

  const respData = await deleteCompetitionService(getFormData.id);

  if (respData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message:
          respData.message || "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData?.errors || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Delete Competition.",
      },
    };
  }

  revalidateTag("competitions");

  return {
    data: {
      ...respData,
    },
  };
}

export async function updateCompetitionAction(_: any, formData: FormData) {
  const getFormData = {
    data: JSON.parse(formData.get("data") as string),
  };

  const respData = await updateCompetitionService(getFormData.data);

  if (respData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message:
          respData.message || "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData?.errors || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Update Competition.",
      },
    };
  }

  revalidateTag("competitions");
  revalidateTag("competition");

  return {
    data: {
      ...respData,
    },
  };
}

export async function joinedCompetitionAction(_: any, formData: FormData) {
  const getFormData = {
    competitionId: formData.get("competitionId")?.toString() || "",
  };

  const respData = await joinedCompetitionService(getFormData.competitionId);

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

  if (
    respData?.errors &&
    respData?.errors?.length > 0 &&
    respData?.errors[0].hasJoined
  ) {
    const id = respData.errors[0].competeId;
    redirect(`/features/competequiz/${id}`);
  }

  if (respData?.errors || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Join Competition.",
      },
    };
  }

  revalidateTag("competitions");
  revalidateTag("competition");
  revalidateTag("joinedCompetition");

  return {
    data: {
      ...respData,
      compete: respData.other.compete,
    },
  };
}

export async function submitCompetitionAction(_: any, formData: FormData) {
  const getFormData = {
    data: JSON.parse(formData.get("data") as string),
  };

  const respData = await submitCompetitionService(getFormData.data);

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message:
          respData.message || "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData?.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (respData?.errors || !respData?.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to Submit Competition.",
      },
    };
  }

  revalidateTag("competitions");
  revalidateTag("leaderboard");
  revalidateTag("joinedCompetition");
  revalidateTag("feedback");

  return {
    data: {
      ...respData,
      compete: respData.other.compete,
    },
  };
}
