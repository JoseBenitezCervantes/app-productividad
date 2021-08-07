import React, { forwardRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { FormControl, Grid, IconButton, TextField } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import PauseIcon from "@material-ui/icons/Pause";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useForm } from "../../../hooks/useForm";
import { useFetch } from "../../../hooks/useFetch";

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

const DetailTask = ({ setOrderDetail, orderDetail }) => {
  const classes = useStyles();
  const handleClose = () => {
    setOrderDetail({ data: "", isOpen: false, type: "" });
  };
  const isDetail = orderDetail.type === "DETAIL";
  const [detail, setDetail] = useState({
    data: {},
    error: false,
    loading: isDetail,
  });
  const getData = async () => {
    const url = `${process.env.REACT_APP_SERVER_ARKON}/api/tasks/get/${orderDetail.data}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log("🚀 ~ file: index.js ~ line 78 ~ getData ~ result", result);
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

  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 30,
    valueSize: "short",
  });
  const [orderDetailState, setOrderDetailState] = useState(orderDetail);
  const [editTime, setEditTime] = useState(false);
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
        open={orderDetail.isOpen}
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
                {orderDetailState.type !== "NEW" && (
                  <Typography variant="h3" className={classes.title}>
                    {detail.data?.task?.name ?? "Nueva Tarea"}
                  </Typography>
                )}
                <Button autoFocus color="white" onClick={handleClose}>
                  <Typography variant="h6" className={classes.exit}>
                    Salir
                  </Typography>
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent>
              {orderDetailState.type == "NEW" && (
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
              {orderDetailState.type === "NEW" && (
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
              <List>
                <Grid container spacing={1} className={classes.timerIcons}>
                  <Grid item xs={12}>
                    <h1 className={classes.fontTime}>05:45</h1>
                  </Grid>
                  <Grid item xs={4} className={classes.playIcon}>
                    <IconButton>
                      <PlayCircleOutlineIcon fontSize={"large"} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4} className={classes.pauseIcon}>
                    <IconButton>
                      <PauseIcon fontSize={"large"} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4} className={classes.restartIcon}>
                    <IconButton>
                      <SettingsBackupRestoreIcon fontSize={"large"} />
                    </IconButton>
                  </Grid>
                </Grid>
              </List>
            </DialogContent>
            {orderDetailState.type == "NEW" ? (
              <DialogActions className={classes.leftAlignDialogActions}>
                <Button variant="contained" color="secondary">
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
