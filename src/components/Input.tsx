import React from "react";
import "../App.css";

export default function Input({ setSearchTerm }: any) {
  return (
    <div className="input-group">
      <input
        className="input-list"
        placeholder="Enter the id"
        onChange={(event) => setSearchTerm(event.target.value)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          parseInt(e.target.value || "");
        }}
        maxLength={4}
        type="number"
      />
    </div>
  );
}
