import { Course } from "@/interfaces/Course"
import React from "react";

interface CursosProps {
    courses: Course[]
}

const Cursos: React.FC<CursosProps> = ({courses}) => {
  return (
    <div>
      { courses.length > 0 ? (
        courses.map((course, index) => (
          <div key={index}>
            <h2>{course.id}</h2>
            <p>{course.name}</p>
            <p>Créditos: {course.credits}</p>
            <p>Ciclo: {course.level}</p>
            <p>Requisitos: {course.requisites.map((re)=>re + " ")}</p>
          </div>
        ))
      ):(
        <p>No hay cursos disponibles.</p>
      )}
    </div>
  )
}

export default Cursos;
