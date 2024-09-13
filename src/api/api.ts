import { PersonalData } from "../interfaces/interfaces";

const API_URL = "http://localhost:5000/api";

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/data`);
  const data = await response.json();
  return data;
};

export const postData = async (data: PersonalData) => {
  console.log(data, "data from post");
  const response = await fetch(`${API_URL}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
};
