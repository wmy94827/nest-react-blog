import dayjs from 'dayjs';

// 格式化时间
export const formatDate = (
  date: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(date).format(format);
};

export const getQueryString = (search: string, key: string) => {
  const searchParams = new URLSearchParams(search.substring(1));
  return searchParams.get(key);
};
