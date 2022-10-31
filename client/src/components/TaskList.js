import { Card, CardContent, Typography, Button, ButtonBase } from "@mui/material";
import { useEffect, useState } from "react"; // use state es para poder crear una variable o un estado 
import {useNavigate} from 'react-router-dom' 

export default function TaskList() {

  const [tasks, setTasks] = useState([])
  const navigate = useNavigate( );
  const loadTask = async () => {
    const response = await fetch('http://localhost:4000/task')
    const data = await response.json()
    setTasks(data)
  }
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
    })
   setTasks(
    tasks.filter(task => task.id !== id)

   ) 
  }

  useEffect(() => {
    loadTask()
  }, [])
  return (

    <>
      <h1>Task List</h1>
      {
        tasks.map((task) => (
          <Card class="card"
          style={
            {
              marginTop: "0.7rem",
            }}
            key={task.id}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography>{task.title}</Typography>
                <Typography>{task.descriptios}</Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(`/task/${task.id}/edit`)}>
                  edit
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleDelete(task.id)}
                  style={{ margin: "0.5rem" }}
                >
                  delete
                </Button>
              </div>
            </CardContent>

          </Card>
        ))
      }

    </>

  )
}
