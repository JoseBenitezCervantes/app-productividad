import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip } from "victory";
import { useFetch } from "../../../hooks/useFetch";
import materialTheme from "./theme";

const ChartData = () => {
  const url = `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/getReportTasks`;
  const { data, loading, error } = useFetch(url);
  console.log("🚀 ~ file: index.js ~ line 9 ~ ChartData ~ data", data)
  if (loading || error || data?.data.length == 0) {
    return <h4>Cargando Grafica</h4>;
  }
  return (
    <>
      {data?.data.length && (
        <VictoryChart
          padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
          theme={materialTheme}
          height={120}
          domainPadding={{ x: 20 }}
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={["L", "M", "M", "J", "V", "S", "D"]}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={data.data}
            x="day"
            y="timeProduction"
          />
        </VictoryChart>
      )}
    </>
  );
};

export default ChartData;
