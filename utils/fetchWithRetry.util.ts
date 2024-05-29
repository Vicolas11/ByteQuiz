export async function fetchWithTimeoutAndRetry(
  url: URL,
  options: RequestInit = {},
  timeout: number = 4900,
  retries: number = 3
): Promise<Response> {
  const fetchData = async (attempt: number): Promise<Response> => {
    if (attempt > retries) {
      throw new Error("Maximum retries exceeded");
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error: any) {
      clearTimeout(id);

      if (error.name === "AbortError") {
        console.log(`Timeout: Retrying request (${attempt}/${retries})...`);
      } else {
        console.log(`Error: Retrying request (${attempt}/${retries})...`);
      }

      return fetchData(attempt + 1);
    }
  };

  return fetchData(1);
}
