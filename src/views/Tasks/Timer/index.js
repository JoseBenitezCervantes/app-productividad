import React, { useEffect, useState } from "react";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import PauseIcon from "@material-ui/icons/Pause";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Grid, IconButton, List, makeStyles } from "@material-ui/core";
import { useTimer } from "react-timer-hook";

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

const Timer = ({ detail }) => {
  const { task } = detail.data;

  // Inicializa los tiempos del timer
  const restHrs = task?.restTime[0];
  const restMin = task?.restTime[1];
  const classes = useStyles();
  const timeI = new Date();
  timeI.setHours(timeI.getHours() + restHrs);
  timeI.setMinutes(timeI.getMinutes() + restMin);
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
        restTime: [hours, minutes],
        id: task?._id,
        statusTask,
        name: task.name,
        description: task.description,
        initialTime: task.initialTime
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  //Guarda el estatus cada 30 segundos o cuando acaba
  useEffect(() => {
    if ((seconds === 30 || seconds === 0) && isRunning) {
      updateStatus("RUN");
    } 
    if(minutes === 0 && seconds === 0){
      updateStatus("FINISH");
    }
  }, [seconds]);

  return (
    <div>
      <List>
        <Grid container spacing={1} className={classes.timerIcons}>
          <Grid item xs={12}>
            <h1 className={classes.fontTime}>{`0${hours}:${
              minutes.toString().length === 1 ? `0${minutes}` : minutes
            }:${seconds}`}</h1>
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
                timeRestart.setHours(timeRestart.getHours() + restHrs);
                timeRestart.setMinutes(timeRestart.getMinutes() + restMin);
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
