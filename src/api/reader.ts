import { Course } from "@/interfaces/Course"

export const loadCourses = async (data:string):Promise<Course[]> =>{
    console.log("todo nice")
    const input = {
        csvData: data
    }
    const response = await fetch("http://localhost:3000/reader",{
        method: 'POST',
        body: JSON.stringify(input)
    })
    const courses: Course[] = await response.json();
    console.log(courses);
    return courses;
}