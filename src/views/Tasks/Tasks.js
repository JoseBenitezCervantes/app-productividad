import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DetailTask from "./DetailTask";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";

const Tasks = () => {
  const url = `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/getTasks`;
  const { data, loading, error } = useFetch(url, "POST", {
    findStatus: [
      { statusTask: "PAUSE" },
      { statusTask: "RUN" },
      { statusTask: "NEW" },
    ],
  });
  const [open, setOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState("");
  
  const handleClickOpen = (rowData) => {
    setOpen(true);
    setOrderDetail(rowData);
  };
  const getMuiTheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          contrastText: "withe",
          dark: "#3f51b5",
          main: "#3f51b5",
          light: "#3f51b5",
        },
      },
    });
  const columns = [
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
    {
      name: "address",
      label: "Detalle",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label={`visibility icon ${tableMeta.rowIndex}`}
              id={`icon ${tableMeta.rowIndex}`}
              onClick={() => handleClickOpen(tableMeta.rowData)}
            >
              <VisibilityIcon />
            </IconButton>
          );
        },
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
  if (loading) return <h1>Loading...</h1>;
  console.log("🚀 ~ file: Tasks.js ~ line 14 ~ Tasks ~ data", data)

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <h1>Admin Tareas</h1>

      <Box display="flex" flexDirection="row-reverse" margin={"1rem"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClickOpen("NEW")}
        >
          Nueva Tarea
        </Button>
      </Box>

      <MUIDataTable
        title={"Tareas Pendientes"}
        data={data.task}
        columns={columns}
        options={options}
      />
      {open && (
        <DetailTask open={open} setOpen={setOpen} orderDetail={orderDetail} />
      )}
    </MuiThemeProvider>
  );
};

export default Tasks;
