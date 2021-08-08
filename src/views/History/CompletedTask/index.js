import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useFetch } from "../../../hooks/useFetch";
import { formatTimeString } from "../../../misc/formatData";

const CompletedTask = () => {
  //Se obtiene la lista de tareas activas
  const url = `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/getTasks`;
  const { data, loading, error } = useFetch(url, "POST", {
    findStatus: [
      { statusTask: "FINISH" },
    ],
  });

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveScroll: {
            maxHeight: 'none',
          },
        },
      },
      palette: {
        primary: {
          contrastText: "withe",
          dark: "#3f51b5",
          main: "#3f51b5",
          light: "#3f51b5",
        },
      },
    });

  //Columnas para estructurar la tabla
  const columns = [
    {
      name: "id",
      visible: false,
      label: "id",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      visible: false,
      label: "Nombre",
      options: {
        filter: false,
      },
    },
    {
      name: "description",
      visible: false,
      label: "Descripcion",
      options: {
        filter: false,
      },
    },
    {
      name: "creationDate",
      label: "Fecha",
      options: {
        filter: true,
      },
    },
    {
      name: "initialTime",
      label: "Duracion Inicial",
      options: {
        filter: false,
      },
    },
    {
      name: "restTime",
      label: "Tiempo Restante",
      options: {
        filter: false,
      },
    },
    {
      name: "completedTime",
      label: "Duracion Final",
      options: {
        filter: false,
      },
    }
  ];

  //Opciones para customizar la tabla
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    searchOpen: true,
    selectableRowsHeader: false,
    selectableRows: "none",
    print: false,
    download: false,
    toolbar: false,
    filter: false,
    showResponsive: true,
    textLabels: {
      body: {
        noMatch: "No se encontro",
      },
      toolbar: {
        search: "Buscar",
        viewColumns: "Ver Columnas",
      },
      pagination: {
        next: "Sig. Pagina",
        previous: "Anterior",
        rowsPerPage: "Numero de tareas por pagina:",
        displayRows: "de",
      },
      viewColumns: {
        title: "Columnas",
      },
    },
  };
  if (loading || error) return <h1>Loading...</h1>;

  const getDuration = (duration) => {
    const h = duration[0];
    const m = duration[1];
    if (h === 0 && m > 0 && m <= 30) {
      return "CORTA";
    } else if (h === 0 && m > 30 && m <= 59) {
      return "MEDIA";
    } else {
      return "LARGA";
    }
  };

  //Filtra la data de la respuesta para llenar la tabla
  const arrData = Array.from(data.task, (x) => ({
    id: x._id,
    name: x.name,
    description: x.description,
    creationDate: x.creationDate,
    initialTime: formatTimeString(
      x?.initialTime[0],
      x?.initialTime[1],
      x?.initialTime[2]
    ),
    restTime: formatTimeString(x?.restTime[0], x?.restTime[1], x?.restTime[2]),
    duration: getDuration(x?.initialTime),
    completedTime: x.completedTime
  }));

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <h1>Tareas Completadas</h1>

      <MUIDataTable
        title={"Tareas Pendientes"}
        data={arrData}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
};

export default CompletedTask;
