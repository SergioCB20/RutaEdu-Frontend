import MainPage from "./pages/MainPage/MainPage"
import Cursos from "./pages/MainPage/Cursos";
import { Course } from "./interfaces/Course"
import { useState } from "react"
function App() {
  const [courses,setCourses] = useState<Course[]>([]);
  return (
    <div className='w-full h-full grid place-items-center'>
      <div className="w-[500px] h-[400px] border-black border-2">
        <MainPage setCourses={setCourses}/>
        <Cursos courses={courses}/>
      </div>
    </div>
  )
}

export default App
