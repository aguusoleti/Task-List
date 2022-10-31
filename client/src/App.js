import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskForms from './components/TaskForms'
import TaskList from './components/TaskList'
import NavBar from "./components/Navbar";
import { Container } from '@mui/material'
export default function App() {
  return (

    <BrowserRouter>
    <NavBar/>
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task/new' element={<TaskForms />} />
          <Route path='/task/:id/edit' element={<TaskForms />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

