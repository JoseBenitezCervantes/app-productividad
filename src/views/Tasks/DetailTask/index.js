import React, { forwardRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { FormControl, Grid, TextField } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { useForm } from "../../../hooks/useForm";
import Timer from "../Timer";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  leftAlignDialogActions: {
    justifyContent: "flex-start",
  },
  appBar: {
    position: "relative",
    background: "#3f51b5",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
  },
  exit: {
    color: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  fontTime: {
    fontSize: "10rem",
  },
  timerIcons: {
    textAlign: "center",
  },
  playIcon: {
    textAlign: "right",
  },
  pauseIcon: {
    textAlign: "center",
  },
  restartIcon: {
    textAlign: "left",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailTask = ({ setTaskDetail, taskDetail }) => {
  const classes = useStyles();
  const handleClose = () => {
    setTaskDetail({ data: "", isOpen: false, type: "" });
  };
  const isDetail = taskDetail.type === "DETAIL";
  const [detail, setDetail] = useState({
    data: {},
    error: false,
    loading: isDetail,
  });
  const getData = async () => {
    const url = `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/get/${taskDetail.data}`;
    const response = await fetch(url);
    const result = await response.json();
    setDetail({ data: result, error: false, loading: false });
  };
  useEffect(() => {
    if (isDetail) {
      getData();
    }
  }, []);

  const initialForm = {
    name: "",
    description: detail.data?.task?.description ?? "",
  };
  const [taskDetailState, setTaskDetailState] = useState(taskDetail);
  const [editTime, setEditTime] = useState(false);
  const [message, setMessage] = useState({
    msg: "",
    isShow: false,
    isError: false,
  });
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 30,
    valueSize: "short",
  });
  const validData = () => {
    if (
      time.hours < 0 ||
      time.hours > 2 ||
      time.minutes < 0 ||
      time.minutes > 60
    ) {
      setMessage({
        msg: "Formato de tiempo incorrecto",
        isShow: true,
        isError: true,
      });
      return false;
    }
    if (time.hours === 0 && time.minutes === 0) {
      setMessage({
        msg: "Agrege Tiempoo",
        isShow: true,
        isError: true,
      });
      return false;
    }
    if (!formValues.name || !formValues.description) {
      setMessage({
        msg: "Descripcion o nombre incorrecto",
        isShow: true,
        isError: true,
      });
      return false;
    }

    return true;
  };
  const addTask = async () => {
    if (validData()) {
      console.log("🚀 ~ file: index.js ~ line 90 ~ DetailTask ~ time", time);
      console.log(
        "🚀 ~ file: index.js ~ line 89 ~ DetailTask ~ formValues",
        formValues
      );
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/add`,
        {
          method: "POST",
          body: JSON.stringify({
            name: formValues.name,
            description: formValues.description,
            initialTime: [time.hours, time.minutes],
            restTime: [time.hours, time.minutes],
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      if (result.msg === "Tarea agregada") {
        setMessage({
          msg: "Tarea Agregada",
          isShow: true,
          isError: false,
        });

        setTimeout(() => {
          window.location.href = "/admin/tasks";
        }, 1000);
      }
    }
  };

  const handleChange = (event) => {
    const valueSize = event.target.value;
    if (valueSize === "short") {
      setTime({ hours: 0, minutes: 30, valueSize });
    } else if (valueSize === "medium") {
      setTime({ hours: 0, minutes: 45, valueSize });
    } else if (valueSize === "large") {
      setTime({ hours: 1, minutes: 0, valueSize });
    }
    setEditTime(false);
  };

  const onclickEditable = () => {
    setTime({ hours: 0, minutes: 0, valueSize: "" });
    setEditTime(!editTime);
  };

  const onEditTime = (event) => {
    const valueSize = event.target.value;
    setTime({ hours: valueSize, minutes: 0, valueSize: "" });
  };

  return (
    <div>
      <Dialog
        open={taskDetail.isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {detail.loading || detail.error ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <AppBar className={classes.appBar}>
              <Toolbar>
                {taskDetailState.type !== "NEW" && (
                  <Typography variant="h3" className={classes.title}>
                    {detail.data?.task?.name ?? "Nueva Tarea"}
                  </Typography>
                )}
                <Button autoFocus color="white" onClick={handleClose}>
                  <Typography
                    variant="h6"
                    className={classes.exit}
                    onClick={() => {
                      window.location.href = "/admin/tasks";
                    }}
                  >
                    Salir
                  </Typography>
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent>
              {message.isShow && (
                <Alert severity={message.isError ? "error" : "success"}>
                  {message.msg}
                </Alert>
              )}

              {isDetail && (
                <List>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} xl={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <TextField
                            label="Fecha De Registro"
                            rows={4}
                            variant="outlined"
                            name="name"
                            margin="dense"
                            disabled
                            value={detail.data?.task?.creationDate}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Estimacion Inicial"
                            rows={4}
                            variant="outlined"
                            margin="dense"
                            name="name"
                            disabled
                            value={`0${detail.data?.task?.initialTime[0]}:${detail.data?.task?.initialTime[1]}`}
                            onChange={handleInputChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </List>
              )}
              {taskDetailState.type == "NEW" && (
                <List>
                  <TextField
                    label="Nombre De Tarea"
                    fullWidth
                    rows={4}
                    variant="outlined"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </List>
              )}
              <List>
                <TextField
                  id="outlined-multiline-static"
                  label="Descripcion"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                  name="description"
                  value={
                    isDetail
                      ? detail.data?.task?.description
                      : formValues.description
                  }
                  onChange={handleInputChange}
                />
              </List>
              {(taskDetailState.type === "NEW" ||
                taskDetailState.type === "EDIT") && (
                <>
                  <List>
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Duracion
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        onChange={handleChange}
                        value={time.valueSize}
                      >
                        <MenuItem value={"short"}>Corta: 30 min</MenuItem>
                        <MenuItem value={"medium"}>Media: 45 min</MenuItem>
                        <MenuItem value={"large"}>Larga: 1h</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <Button
                        aria-label="Cerrar Alert Dialog"
                        id="CerrarAlertDialog"
                        color="primary"
                        onClick={() => onclickEditable()}
                      >
                        Editar Tiempo
                      </Button>
                    </FormControl>
                  </List>
                  {editTime && (
                    <List>
                      <FormControl
                        variant="filled"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Horas
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          onChange={onEditTime}
                        >
                          <MenuItem value={0}>0h</MenuItem>
                          <MenuItem value={1}>1h</MenuItem>
                          <MenuItem value={2}>2h</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl
                        variant="filled"
                        className={classes.formControl}
                      >
                        <TextField
                          id="outlined-number"
                          label="Minutos"
                          type="number"
                          variant="filled"
                          maxRows="2"
                          name="timeMinutes"
                          value={time.minutes}
                          onChange={(e) => {
                            setTime({ ...time, minutes: e.target.value });
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </List>
                  )}
                </>
              )}
              {isDetail && <Timer {...{ detail }} />}
            </DialogContent>
            {taskDetailState.type == "NEW" ? (
              <DialogActions className={classes.leftAlignDialogActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addTask()}
                >
                  Agregar Tarea
                </Button>
              </DialogActions>
            ) : (
              <DialogActions className={classes.leftAlignDialogActions}>
                <Button variant="contained" color="secondary">
                  Eliminar Tarea
                </Button>
                <Button variant="contained">Editar Tarea</Button>
              </DialogActions>
            )}
          </>
        )}
      </Dialog>
    </div>
  );
};

export default DetailTask;
