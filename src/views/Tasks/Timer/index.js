import React, { useEffect, useState } from "react";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import PauseIcon from "@material-ui/icons/Pause";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Button, Grid, IconButton, List, makeStyles } from "@material-ui/core";
import { useTimer } from "react-timer-hook";
import Swal from "sweetalert2";
import { formatTimeString } from "../../../misc/formatData";

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
    fontSize: "6rem",
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

const Timer = ({ detail, setTaskDetail, taskDetail }) => {
  const { task } = detail.data;

  // Inicializa los tiempos del timer
  const restHrs = task?.restTime[0];
  const restMin = task?.restTime[1];
  const restSec = task?.restTime[2];
  const classes = useStyles();
  const timeI = new Date();
  timeI.setHours(timeI.getHours() + restHrs);
  timeI.setMinutes(timeI.getMinutes() + restMin);
  timeI.setSeconds(timeI.getSeconds() + restSec);
  const { seconds, minutes, hours, start, isRunning, pause, restart } =
    useTimer({
      expiryTimestamp: timeI,
      autoStart: false,
    });

  //Actualiza el tiempo y el estatus de la tarea
  const updateStatus = (statusTask) => {
    fetch(`${process.env.REACT_APP_SERVER_ARKON}/api/tasks/update`, {
      method: "PUT",
      body: JSON.stringify({
        restTime: [hours, minutes, seconds],
        id: task?._id,
        statusTask,
        name: task.name,
        description: task.description,
        initialTime: task.initialTime,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  //Guarda el estatus cada 30 segundos o cuando acaba
  useEffect(() => {
    if ((seconds === 30 || seconds === 0) && isRunning) {
      updateStatus("RUN");
    }
    if (minutes === 0 && seconds === 0) {
      updateStatus("FINISH");
    }
  }, [seconds]);

  //Finaliza una tarea
  const onFinishTask = () => {
    updateStatus("FINISH");
    setTaskDetail({ ...taskDetail, isOpen: false });
    Swal.fire("Buen Trabajo!", "Tarea Finalizada!", "success").then(() => {
      window.location.href = "/admin/tasks";
    });
  };

  const formatTimer = formatTimeString(hours, minutes, seconds);
  return (
    <div>
      <List>
        <Grid container spacing={1} className={classes.timerIcons}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onFinishTask()}
            >
              Terminar Tarea
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h4 className={classes.fontTime}>{formatTimer}</h4>
          </Grid>
          <Grid item xs={4} className={classes.playIcon}>
            <IconButton
              onClick={() => {
                updateStatus("RUN");
                start();
              }}
            >
              <PlayCircleOutlineIcon fontSize={"large"} />
            </IconButton>
          </Grid>
          <Grid item xs={4} className={classes.pauseIcon}>
            <IconButton
              onClick={() => {
                updateStatus("PAUSE");
                pause();
              }}
            >
              <PauseIcon fontSize={"large"} />
            </IconButton>
          </Grid>
          <Grid item xs={4} className={classes.restartIcon}>
            <IconButton
              onClick={() => {
                const timeRestart = new Date();
                const initHrs = task?.initialTime[0];
                const initMin = task?.initialTime[1];
                const initSec = task?.initialTime[2];
                timeRestart.setHours(timeRestart.getHours() + initHrs);
                timeRestart.setMinutes(timeRestart.getMinutes() + initMin);
                timeRestart.setSeconds(timeRestart.getSeconds() + initSec);
                updateStatus("RUN");
                restart(timeRestart);
              }}
            >
              <SettingsBackupRestoreIcon fontSize={"large"} />
            </IconButton>
          </Grid>
        </Grid>
      </List>
    </div>
  );
};

export default Timer;
