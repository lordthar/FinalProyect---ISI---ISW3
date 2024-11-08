
import React from 'react'
import NavBarPeti from '../components/NavBarAlum'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBarPeti></NavBarPeti>
      {children}
      </div>
  )
}

export default layout
