import { constant } from "@/configs/constant.config";
import { envConfig } from "@/configs/env.config";
import { verifyToken } from "@/utils/jwt.util";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export async function createCompetitionService(userData: any) {
  const url = new URL("api/competitions", baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Create Competition Service Error:", error);
    return {
      data: {
        status: false,
        message: "Create Competition Service Error",
      },
    };
  }
}

export async function deleteCompetitionService(id: string) {
  const url = new URL(`api/competitions/${id}`, baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    redirect("/login");
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Delete Competition Service Error:", error);
    return {
      data: {
        status: false,
        message: "Delete Competition Service Error",
      },
    };
  }
}

export async function joinedCompetitionService(id: string) {
  const url = new URL(`api/competitions/${id}/join`, baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    redirect("/login");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Joined Competition Service Error:", error);
    return {
      data: {
        status: false,
        message: "Joined Competition Service Error",
      },
    };
  }
}

export async function updateCompetitionService(userData: any) {
  const isEmpty = Object.values(userData).some((val) => val === "");
  const url = new URL(`api/competitions`, baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (isEmpty) {
    return;
  }

  if (!authToken) {
    redirect("/login");
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Update Complaint Service Error:", error);
    return {
      data: {
        status: false,
        message: "Update Complaint Service Error",
      },
    };
  }
}

export async function submitCompetitionService(userData: any) {
  const url = new URL("api/competitions/submit", baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Submit Competition Service Error:", error);
    return {
      data: {
        status: false,
        message: "Submit Competition Service Error",
      },
    };
  }
}
