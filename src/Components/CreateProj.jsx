import Input from "./Input"
import { useRef, useState } from "react"
import { ClassesHelpers } from '../Constants'

export default function CreateProj({setProjectSelected, addProject}) {
    const [invalid, setInvalid] = useState([0, 0, 0]);
    const titleRef = useRef();
    const descRef = useRef();
    const dueRef = useRef();

    const save = ()=>{
        if ((dueRef.current.value.length == 0) || (titleRef.current.value.length == 0) || (descRef.current.value.length == 0)) {
            setInvalid([
                (titleRef.current.value.length === 0) ? 1 : 0,
                (descRef.current.value.length === 0) ? 1 : 0,
                (dueRef.current.value.length === 0) ? 1 : 0
            ]);
        } else {
            addProject(titleRef.current.value, descRef.current.value, new Date(dueRef.current.value));
        }
    };

    const changed = (event, idx) => {
        if ((event.target.value.length !== 0) && (invalid[idx] !== 0)) {
            setInvalid((old) => {
                let copy = [...old];
                copy[idx] = 0;
                return copy;
            })
        }
    };

    return (
        <div className="flex flex-col basis-3/4 pr-12 pl-12">
            <div className="self-end">
                <button className="text-red-900 mr-4 hover:text-red-950" onClick={()=>{setProjectSelected(undefined)}}>Cancel</button>
                <button  type="button" className={ClassesHelpers.blackButton} onClick={()=> 
                    save()
                }>Save</button>
            </div>
            <Input onChange={(event)=> changed(event, 0)} tittle='TITLE' InputType='input' ref={titleRef} invalid={invalid[0]}/>
            <Input onChange={(event)=> changed(event, 1)} tittle='DESCRIPTION' InputType='textarea' rows='4' ref={descRef} invalid={invalid[1]}/>
            <Input onChange={(event)=> changed(event, 2)} tittle='DUE DATE' InputType='input' type='date' ref={dueRef} invalid={invalid[2]}/>

        </div>
    )
}