import React from 'react'
import NavBarAux from '../components/NavBarAux'
import "./global.css"

function AuxiliarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBarAux/>
      {children}
      </div>
  )
}

export default AuxiliarLayout