import { useEffect, useState } from "react";

export interface IPaginateProps {
  data: [];
  page: number;
  nextPage: number;
  prevPage: number;
  per_page: number;
  total: number;
}

export default function usePaginate(url: string, query: object) {
  const [data, setData] = useState<IPaginateProps>({
    data: [],
    page: 0,
    nextPage: 0,
    prevPage: 0,
    per_page: 5,
    total: 12,
  });

  useEffect(() => {
    fetch(`${url}?${query.toString()}`, {})
      .then((res) => {
        return res.json();
      })
      .catch((err: Error) => {
        alert(err.message);
      })
      .then(({ data, per_page, total, page }) => {
        setData({
          data,
          per_page,
          total,
          page,
          nextPage: page + 1,
          prevPage: page - 1,
        });
      });
  }, [query.toString()]);

  return data;
}
