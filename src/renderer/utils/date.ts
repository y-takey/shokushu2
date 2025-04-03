// YYYY/MM/DD
const formatDate = (date: Date) =>
  date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const formatToday = () => formatDate(new Date());

const formatSeconds = (seconds?: number) => {
  if (!seconds) return "";

  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
};

export { formatDate, formatToday, formatSeconds };
