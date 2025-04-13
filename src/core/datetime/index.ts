import { format as formatDate, parseISO } from "date-fns";

export const formatIsoDateTime = (isoDateTime: string, format: string) => {
  const date = parseISO(isoDateTime);

  return formatDate(date, format);
};
