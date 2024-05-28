export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};
