
import React from 'react'
import Schedule from '../components/schedule'


function HomeUser(schedule: any) {
  
  return (
  <div className="bg-gray-100 min-h-screen p-8"> <h1 className="text-3xl font-bold text-center mb-8">Horario de Clases</h1> 
  <Schedule schedule={schedule}/> </div>)
}

export default HomeUser