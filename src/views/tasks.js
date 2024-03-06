import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, getTasks} from "../state/task/reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import {Button} from "@mui/material";
import './styles.css';
import ModalForm from "./components/form";
import {getPriorities} from "../state/priority/reducer";
import {getStatus} from "../state/status/reducer";

const Tasks = () => {

    const dispatch = useDispatch();

    const {tasks} = useSelector(state => state.task);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getTasks());
        dispatch(getPriorities());
        dispatch(getStatus());
    }, []);

    const handleDelete = (values) => {
        let body = {
            id: values
        };
        dispatch(deleteTask(body))
    }

    return (
      <div>
          <Button variant="contained"
                  onClick={handleOpen}
                  color="primary" style={{margin: '2%'}}>Crear tarea</Button>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className="custom-table">
                  <TableHead>
                      <TableRow>
                          <TableCell align="center">Tarea</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Fecha de inicio</TableCell>
                          <TableCell align="center">Fecha de finalización</TableCell>
                          <TableCell align="center">Duración</TableCell>
                          <TableCell align="center">Prioridad</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {tasks.map((row) => (
                          <TableRow
                              key={row.id}
                          >
                              <TableCell  scope="row" align="center">
                                  {row.name}
                              </TableCell>
                              <TableCell align="center">{row.description}</TableCell>
                              <TableCell align="center">{row.beginDate}</TableCell>
                              <TableCell align="center">{row.endDate}</TableCell>
                              <TableCell align="center">{row.duration}</TableCell>
                              <TableCell align="center">{row.priority.name}</TableCell>
                              <TableCell align="center">{row.status.name}</TableCell>
                              <TableCell align="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <div style={{marginRight: '10%'}}>
                                      <ModeIcon />
                                  </div>
                                  <div onClick={() => handleDelete(row.id)}>
                                      <DeleteIcon />
                                  </div>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
          <ModalForm visible={open} close={handleClose}/>
      </div>
  )
}

export default Tasks;
