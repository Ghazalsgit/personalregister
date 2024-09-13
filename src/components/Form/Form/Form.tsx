import React, { EventHandler, useState } from "react";
import "./Form.css";
import { postData } from "../../../api/api";
import { PersonalData } from "../../../interfaces/interfaces";

interface FormProps {
  onDataChange: () => void;
}
const Form: React.FC<FormProps> = ({ onDataChange }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [nickname, setNickname] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: PersonalData = {
      name,
      age,
      nickname,
      date,
    };

    try {
      await postData(formData);

      setName("");
      setAge(0);
      setNickname("");
      setDate("");
      onDataChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>
          Namn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Ålder:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Smeknamn:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Datum:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </label>
      </div>
      <button type="submit" className="submit-button">
        Spara
      </button>
    </form>
  );
};
export default Form;
