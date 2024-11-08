"use client";
import { useState, useEffect } from "react";

export default function ApiSample() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("localhost:5000/sample")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>API Sample</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
