import { useState } from 'react'
import Low_bar from './Low_bar.jsx'
import Main_screen from './Main_screen.jsx'
import High_bar from './high_bar.jsx' 
function App() {


  return (
    <>

      <High_bar /> 

      <Routes>
       
        <Route path="/" element={<MainScreen />} />
        
       
        <Route path="/crypto/:id" element={<MainScreen />} />
      </Routes>

      
      <Low_bar />
    </>
  )
}

export default App
