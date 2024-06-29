export const convertToNamibiaTime = (utcDate: Date) => {
  const namibiaOffset = 2 * 60;
  const namibiaTime = new Date(utcDate.getTime() + namibiaOffset * 60000);
  return namibiaTime;
};
