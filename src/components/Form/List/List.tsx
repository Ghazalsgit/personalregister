import React, { useEffect, useState } from "react";
import "./List.css";
import { fetchData } from "../../../api/api";
import { PersonalData } from "../../../interfaces/interfaces";

function List() {
  const [data, setData] = useState<PersonalData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result: PersonalData[] = await fetchData();
      const sortedData = result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setData(sortedData);
    };
    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="list-container">
      <ul className="list-items">
        {data.map((entry, index) => (
          <li key={index} className="list-item">
            <p>
              <strong>Namn:</strong> {entry.name}
            </p>
            <p>
              <strong>Ålder:</strong> {entry.age}
            </p>
            <p>
              <strong>Smeknamn:</strong> {entry.nickname}
            </p>
            <p>
              <strong>Datum:</strong> {formatDate(entry.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default List;
