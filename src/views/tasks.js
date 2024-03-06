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
import ModalFormEdit from "./components/formEdit";

const Tasks = () => {

    const dispatch = useDispatch();

    const [focus, setFocus] = useState({});
    const {tasks} = useSelector(state => state.task);

    const [open, setOpen] = useState('');

    const handleClose = () => {
        setOpen('');
        setFocus({});
    };

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

    const openEdit = (values) => {
        setOpen('edit');
        setFocus(values);
    };

    return (
      <div>
          <Button variant="contained"
                  onClick={() => setOpen('create')}
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
                                  <div style={{marginRight: '10%'}}
                                        onClick={() => openEdit(row)}>
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
          {open === 'create' && <ModalForm visible={open} close={handleClose} />}
          {open === 'edit' && <ModalFormEdit visible={open} close={handleClose} focus={focus}/>}
      </div>
  )
}

export default Tasks;
