import React from 'react'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { type ProjectData } from "../DataModel/Project";
import { ClassesHelpers } from '../Constants'

interface ProjectProps {
    project: ProjectData;
    deleteProj: () => void;
}

interface ProjectHandle {
    updateTasks: (tasks: string[]) => void;
}

const Project = forwardRef<ProjectHandle, ProjectProps>(({project, deleteProj}: ProjectProps, ref) => {
    const [tasks, setTasks] = useState<string[]>(project.tasks);
    const taskRef = useRef<HTMLInputElement>(null);
    const addTask = ()=>{
        const nTask = taskRef.current!.value;
        setTasks((old)=> {
            return [
                ...old,
                nTask
            ]
            }
         );
         project.addTask(taskRef.current!.value);
         taskRef.current!.value = '';
    };

    const removeTask = (idx: number)=>{
        setTasks((old)=> {
                let copy: string[] = [...old];
                console.log(copy.length);
                copy.splice(idx, 1);
                console.log(copy.length);
                return copy;
            }
         );
         project.removeTask(idx);
    };

    useImperativeHandle(ref, 
        ()=>({
            updateTasks(tasks: string[]) {
                setTasks(tasks);
            }
        })
    )

    const tasksDivStyle = (tasks.length > 0) ? 'mt-2 bg-gray-200 rounded px-6 py-2' : '';

    return (
        <div className="basis-3/4 mx-6">
            <div className='flex'>
                <h1 className='font-semibold text-2xl text-gray-800 flex-initial w-full'>{project.title.toUpperCase()}</h1>
                <button className='text-red-900 mr-4 hover:text-red-950 text-xl' onClick={deleteProj}>Delete</button>
            </div>
            <p className='text-sm text-gray-500'>{project.date.toDateString()}</p>
            <pre className='mt-6 mb-2'>{project.description}</pre>
            <hr />
            <h1 className='mt-4 font-semibold text-xl text-gray-800 '>Tasks</h1>
            <div className='flex mt-2'>
                <input className={`flex-initial w-full ${ClassesHelpers.input} focus:border-black bg-gray-100`} ref={taskRef} /> 
                <button className='flex-none ml-2 text-gray-800 mr-4 hover:text-black' onClick={addTask}>Add Task</button>
            </div>
            {<ul className={`${tasksDivStyle}`}>
                {
                tasks.map((task, idx)=> 
                    <li key={idx}>
                        <div className='flex mt-2'>
                            <p className={`flex-initial w-full`}>{task}</p>
                            <button className='flex-none ml-2 text-red-900 mr-4 hover:text-red-950' onClick={()=>removeTask(idx)}>clear</button>
                        </div>
                    </li>)
                }
            </ul>
            }
        </div>
    );
}) ;
export default Project;
export type { ProjectHandle };