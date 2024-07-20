import { useForm } from 'react-hook-form';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, FormData } from './validationSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import { Course } from '@/interfaces/Course';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { loadCourses } from '@/api/reader';

interface MainPageProps {
  setCourses: (courses: Course[]) => void;
}

const MainPage:React.FC<MainPageProps> = ({setCourses})=> {
    const form = useForm<FormData>({
      resolver: zodResolver(schema),
    });
    function onSubmit(values:FormData){
        console.log(values);
        if(values.csvFile){
          const reader = new FileReader();
          reader.onload = async (e) => {
            if(e.target?.result && typeof e.target.result === "string"){
              const fileContent = e.target.result;
              const courses = await loadCourses(fileContent);
              setCourses(courses);
            }else{
              console.error('Failed to read file');
            }
          }
          reader.readAsText(values.csvFile);
        }
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full flex flex-col items-center justify-center gap-10'>
        <FormField 
            control={form.control} 
            name="csvFile"
            render={({field})=>{
                return (
                  <FormItem className=''>
                  <FormLabel>File Upload</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  {form.formState.errors.csvFile && (
                    <FormMessage>{form.formState.errors.csvFile.message?.toString()}</FormMessage>
                  )}
                </FormItem>
                )
            }}
            />
            <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default MainPage;
