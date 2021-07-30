import Tasks from "./views/Tasks/Tasks";
import History from "./views/History/History";
import AssignmentIcon from '@material-ui/icons/Assignment';
import HistoryIcon from '@material-ui/icons/History';
const dashboardRoutes = [
  {
    path: "/tasks",
    name: "Tareas",
    component: Tasks,
    layout: "/admin",
    icon: AssignmentIcon
  },
  {
    path: "/history",
    name: "Historial",
    component: History,
    layout: "/admin", 
    icon: HistoryIcon
  },
];

export default dashboardRoutes;
