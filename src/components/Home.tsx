import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import usePaginate from "../hooks/usePaginate";
import Input from "./Input";

interface IHomeProps {
  id: number;
  name: string;
  year: number;
  color: "string";
  pantone_value: "string";
}

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { data, page, total, per_page, nextPage, prevPage } = usePaginate(
    "https://reqres.in/api/product",
    searchParams
  );

  function toggle(i: any) {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  }

  const nPages = Math.ceil(total / per_page);

  return (
    <>
      <Input data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul className="ul-list">
        {data
          .filter((val: IHomeProps) => {
            if (searchTerm === "") {
              return val;
            } else if (String(val.id).includes(searchTerm)) {
              return val;
            }
          })
          .map((item: IHomeProps, i: number) => (
            <li
              key={item.id}
              onClick={() => toggle(i)}
              className="item-list"
              style={{ backgroundColor: item.color }}
            >
              Id: {item.id}. Name: {item.name}. Year: {item.year}
              <h1 className="item-info" key={item.id}>
                {selected === i
                  ? `Id: ${item.id}, Name: ${item.name}, Year: ${item.year} Pantone value: ${item.pantone_value}`
                  : ""}
              </h1>
            </li>
          ))}
      </ul>
      <div className="page-item center">
        <Link
          to={
            page !== 1
              ? `?page=${prevPage}&per_page=${per_page}`
              : `?page=${1}&per_page=${per_page}`
          }
          className="page-link page-prev"
        >
          Previous
        </Link>
        <Link
          className="page-link"
          to={
            page < nPages ? `?page=${nextPage}&per_page=${5}` : `?page=${nPages}&per_page=${5}`
          }
        >
          Next
        </Link>
      </div>
    </>
  );
}
