import React, { useState } from "react";
import "./MainPage.css";
import Form from "../components/Form/Form/Form";
import List from "../components/Form/List/List";

function MainPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <div className="main-page">
      <Form onDataChange={handleDataChange} />
      <List key={refreshKey} />
    </div>
  );
}
export default MainPage;
