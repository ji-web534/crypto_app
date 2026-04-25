import { useState } from 'react'
import Main_screen from './components/Main-screen.jsx'
import { Route, Router, Routes } from 'react-router-dom'
import './app.css'
import { Pantalla_inicio } from './components/Pantalla-inicio.jsx'
import Side_bar from './Side-bar.jsx'
function App() {


  return (
    <div className='app-container'>
   

      <Side_bar/> 
    <div className="detalle-container">
        <Routes>
            <Route path="/crypto/:id" element={<Main_screen />} />
            <Route path="/" element={<Pantalla_inicio/>} />
        </Routes>
    </div>  
    </div>
  )
}


export default App
