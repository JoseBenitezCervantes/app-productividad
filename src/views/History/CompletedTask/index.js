import React from "react";
import MUIDataTable from "mui-datatables";
import users from "./data";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const CompletedTask = () => {
 
  const getMuiTheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          contrastText: "#000000",
          dark: "#3f51b5",
          main: "#000000",
          light: "#000000",
        },
      },
    });
  const columns = [
    {
      name: "id",
      visible: false,
      label: "Nombre",
      options: {
        filter: false,
      },
    },
    {
      name: "id",
      visible: false,
      label: "Descripcion",
      options: {
        filter: false,
      },
    },
    {
      name: "createdAt",
      label: "Fecha",
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: "Duracion",
      options: {
        filter: false,
      },
    },
  ];

  const options = {
    draggable: true,
    filter: false,
    filterType: "dropdown",
    responsive: "scroll",
    searchOpen: true,
    selectableRowsHeader: false,
    selectableRows: "none",
    print: false,
    download: false,
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

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={"Tareas Pendientes"}
        data={users}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
};

export default CompletedTask;
