export const isNull = (value: any) => {
  if (value === undefined || value === null || value === '') {
    return true;
  }
  return false;
};
