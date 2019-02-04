// @flow

// YYYY/MM/DD
const formatDate = (date: Date) =>
  date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const formatToday = () => formatDate(new Date());

const formatSeconds = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${seconds % 60}`;

export { formatDate, formatToday, formatSeconds };
