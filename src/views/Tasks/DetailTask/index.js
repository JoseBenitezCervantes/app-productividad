import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { FormControl, TextField } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailTask = ({ open, setOpen }) => {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              Nombre de la tarea
            </Typography>
            <Button autoFocus color="white" onClick={handleClose}>
              <Typography variant="h6" className={classes.exit}>
                Salir
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <List>
            <TextField
              id="outlined-multiline-static"
              label="Descripcion"
              multiline
              rows={4}
              defaultValue="Default Value Default Value vDefault ValuevDefault Value"
              variant="outlined"
            />
          </List>
          <List>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Duracion
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={30}>Corta: 30 min</MenuItem>
                <MenuItem value={45}>media: 45 min</MenuItem>
                <MenuItem value={60}>Larga: 1h</MenuItem>
              </Select>
            </FormControl>
          </List>
          <List>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Horas
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={0}>0h</MenuItem>
                <MenuItem value={1}>1h</MenuItem>
                <MenuItem value={2}>2h</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
              <TextField
                id="outlined-number"
                label="Minutos"
                type="number"
                variant="filled"
                maxRows="2"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <Button
              aria-label="Cerrar Alert Dialog"
              id="CerrarAlertDialog"
              color="primary"
            >
              Editar
            </Button>
          </List>
        </DialogContent>
        <DialogActions className={classes.leftAlignDialogActions}>
          <Button variant="contained" color="secondary">
            Eliminar Tarea
          </Button>
          <Button variant="contained" >
            Editar Tarea
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailTask;
