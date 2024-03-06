import React, {useState} from 'react';
import { Button, Dialog, DialogContent,
    DialogActions, DialogTitle, Grid,
    InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {updateTask} from "../../state/task/reducer";

const ModalFormEdit = ({visible, close, focus}) => {

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
        let values = {
            id: focus.id,
            name: formData.name !== '' ? formData.name : focus.name,
            description: formData.description !== '' ? formData.description : focus.description,
            beginDate: formData.beginDate !== '' ? formData.beginDate : focus.beginDate,
            endDate: formData.endDate !== '' ? formData.endDate : focus.endDate,
            duration: formData.duration !== '' ? formData.duration : focus.duration,
            priorityId: formData.priorityId !== '' ? formData.priorityId : focus.priority.id,
            statusId: formData.statusId !== '' ? formData.statusId : focus.status.id,
        }
        dispatch(updateTask(values));
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
                        defaultValue={focus.name}
                        value={formData.name !== '' ? formData.name : focus.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Descripción"
                        name="description"
                        defaultValue={focus.description}
                        value={formData.description !== '' ? formData.description : focus.description}
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
                                defaultValue={focus.beginDate}
                                value={formData.beginDate !== '' ? formData.beginDate : focus.beginDate}
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
                                defaultValue={focus.endDate}
                                value={formData.endDate !== '' ? formData.endDate : focus.endDate}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Duración"
                        name="duration"
                        defaultValue={focus.duration}
                        value={formData.duration !== '' ? formData.duration : focus.duration}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <InputLabel id="select-label">Selecciona una prioridad</InputLabel>
                    <Select
                        labelId="select-label"
                        onChange={handleChange}
                        name={'priorityId'}
                        defaultValue={focus.priority.id}
                        fullWidth
                    >
                        {priorities.length > 0 && priorities.map((priority) => (
                            <MenuItem
                                key={priority.id}
                                value={priority.id}
                                defaultValue={focus.duration}
                            >{priority.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel id="select-label-status">Selecciona un status</InputLabel>
                    <Select
                        labelId="select-label"
                        onChange={handleChange}
                        name={'statusId'}
                        defaultValue={focus.status.id}
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
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Actualizar</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ModalFormEdit;
