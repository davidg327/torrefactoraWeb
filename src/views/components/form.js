import React, {useState} from 'react';
import { Button, Dialog, DialogContent,
    DialogActions, DialogTitle, Grid,
    InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {createTask} from "../../state/task/reducer";

const ModalForm = ({visible, close}) => {

    const dispatch = useDispatch();

    const {priorities} = useSelector(state => state.priority);
    const {status} = useSelector(state => state.status);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        beginDate: '',
        endDate: '',
        duration: '',
        priorityId: '',
        statusId: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.name === 'duration' ? parseInt(event.target.value) : event.target.value,
        });
    };

    const handleSubmit = () => {
        dispatch(createTask(formData));
        setFormData({ name: '', description: '', beginDate: '', endDate: '', duration: '', priorityId: '', statusId: '' });
        close();
    };


    return (
        <div>
            <Dialog open={visible} onClose={close} maxWidth="xl">
                <DialogTitle>Crear tarea</DialogTitle>
                <DialogContent dividers style={{ overflowY: 'auto' }}>
                    <TextField
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Descripción"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Fecha de Inicio"
                                name="beginDate"
                                type="date"
                                value={formData.beginDate}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Fecha de Fin"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Duración"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <InputLabel id="select-label">Selecciona una prioridad</InputLabel>
                    <Select
                        labelId="select-label"
                        onChange={handleChange}
                        name={'priorityId'}
                        fullWidth
                    >
                        {priorities.length > 0 && priorities.map((priority) => (
                            <MenuItem key={priority.id} value={priority.id}>{priority.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel id="select-label-status">Selecciona un status</InputLabel>
                    <Select
                        labelId="select-label"
                        onChange={handleChange}
                        name={'statusId'}
                        fullWidth
                    >
                        {status.length > 0 && status.map((status) => (
                            <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={close}>Cerrar</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Crear</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ModalForm;
