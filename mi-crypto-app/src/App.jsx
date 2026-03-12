import { useState } from 'react'

import Main_screen from './Main_screen.jsx'
import High_bar from './high_bar.jsx' 
import { Route, Router, Routes } from 'react-router-dom'
import './app.css'
import { Pantalla_inicio } from './Pantalla-inicio.jsx'
function App() {


  return (
    <div className='app-container'>
     
      <High_bar /> 
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
