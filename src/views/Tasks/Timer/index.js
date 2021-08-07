import React from 'react'
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import PauseIcon from "@material-ui/icons/Pause";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Grid, IconButton, List, makeStyles } from '@material-ui/core';

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

  
const Timer = ({detail}) => {
console.log("🚀 ~ file: index.js ~ line 46 ~ Timer ~ detail", detail)
    const classes = useStyles();
    return (
        <div>
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
        </div>
    )
}

export default Timer
