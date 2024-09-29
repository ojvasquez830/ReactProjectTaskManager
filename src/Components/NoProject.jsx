import noProj from '../assets/no-projects.png'
import { ClassesHelpers } from '../Constants'

export default function NoProject({setProjectSelected}) {
    return (
        <div className='basis-3/4 flex flex-col flex-wrap [&>*]:grow-0 items-center'>
            <img src={noProj} className='h-32 w-32'/>
            <h2 className='mt-8 text-gray-900 font-semibold text-xl'>No Project Selected</h2>
            <p className='mt-2'>Select a project or get started with a new one</p>
            <button className={`mt-4 ${ClassesHelpers.beigeButton}`} onClick={()=>setProjectSelected(-1)}>Create new project</button>
        </div>
    );
}