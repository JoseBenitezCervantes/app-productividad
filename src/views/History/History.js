import React from "react";
import ChartData from "./ChartData";
import CompletedTask from "./CompletedTask";

const History = () => {
  return (
    <div>
      <h1>Historial De Tareas</h1>
      <CompletedTask />
      <h1>Grafico minutos por dia</h1>
      <ChartData />
    </div>
  );
};

export default History;
