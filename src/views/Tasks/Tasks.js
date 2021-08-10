import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DetailTask from "./DetailTask";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";
import { formatTimeString } from "../../misc/formatData";

const Tasks = () => {
  //Se obtiene la lista de tareas activas
  const url = `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/getTasks`;
  const { data, loading, error } = useFetch(url, "POST", {
    findStatus: [
      { statusTask: "PAUSE" },
      { statusTask: "RUN" },
      { statusTask: "NEW" },
    ],
  });
  const [taskDetail, setTaskDetail] = useState({ data: "", isOpen: false });

  const handleClickOpen = (rowData) => {
    setTaskDetail({ data: rowData[0], isOpen: true, type: "DETAIL" });
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
      label: "Duracion",
      options: {
        filter: false,
      },
    },
    {
      name: "restTime",
      label: "Restante",
      options: {
        filter: false,
      },
    },
    {
      name: "duration",
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

  //Opciones para customizar la tabla
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRowsHeader: false,
    selectableRows: "none",
    print: false,
    download: false,
    toolbar: false,
    filter: false,
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
    creationDate: x.creationDate.substr(0,10),
    initialTime: formatTimeString(x?.initialTime[0],x?.initialTime[1],x?.initialTime[2]),
    restTime: formatTimeString(x?.restTime[0],x?.restTime[1],x?.restTime[2]),
    duration: getDuration(x?.initialTime),
  }));

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <h1>Tareas Pendientes</h1>

      <Box display="flex" flexDirection="row-reverse" margin={"1rem"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setTaskDetail({ data: {}, isOpen: true, type: "NEW" })}
        >
          Nueva Tarea
        </Button>
      </Box>

      <MUIDataTable
        title={"Tareas Pendientes"}
        data={arrData}
        columns={columns}
        options={options}
      />
      {taskDetail.isOpen && <DetailTask {...{ setTaskDetail, taskDetail }} />}
    </MuiThemeProvider>
  );
};

export default Tasks;
