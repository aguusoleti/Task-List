import * as React from 'react';

import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
// import e from 'cors';
import { useState, useEffect, } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForms() {

  const [task, setTask] = useState({
    title: " ",
    descriptios: " ",
  })

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setLoading(true);
if (editing){
  const response = await fetch(`http://localhost:4000/task/${params.id}`, {
    method: 'PUT',
    headers: { 
      "Content-Type": "application/json" ,
  },
    body: JSON.stringify(task),
});
const data = await response.json();
}else{

  const res = await fetch('http://localhost:4000/task', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  })
  // const data = await res.json();
}
    navigate('/');
    // setLoading(false);
  }

  const handleCharge = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/task/${id}`)
    const data = await res.json();
    setTask({ title: data.title, descriptios: data.descriptios })
    setEditing(true)
  }
  useEffect(() => {
    if (params.id)
      loadTask(params.id);
  }, [params.id])
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Grid >
        <Card sx={{ mt: 5 }} style={{ borderRadius: '1rem' }}>
          <Typography class="tarjeta">
{editing ? "Edit Task": "Add Task"}
                </Typography>
            <CardContent >
              <form onSubmit={handleSubmit}>

                <TextField
                  variant="outlined"
                  value={task.title}
                  label="Ingrese el Titulo"
                  multiline
                  rows={1}
                  sx={{
                    display: 'block',
                    margin: '0.2rem 0',
                  }}
                  name='title'
                  onChange={handleCharge}
                />

                <TextField
                  variant="outlined"
                  value={task.descriptios}

                  label="Ingrese la Tarea"
                  multiline
                  rows={4}
                  sx={{
                    display: 'block',
                    margin: '0.2rem 0'
                  }}
                  name="descriptios"
                  onChange={handleCharge}
                />

                <Button
                  variant="outlined"
                  size="small"
                  style={{ float: 'right', marginBottom: '1rem' }}
                  type="submit"
                  disabled={!task.title || !task.descriptios}

                >
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Guardar"
                  )}
                </Button>
              </form>
            </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}
