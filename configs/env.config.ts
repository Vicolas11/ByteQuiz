const ENV = process.env.NEXT_PUBLIC_NODE_ENV || "development";

export const envConfig = {
  test: ENV === "test",
  dev: ENV === "development",
  prod: ENV === "production",
};
