import { ClassesHelpers } from '../Constants'

export default function LeftNav({projects, setProjectSelected, projectSelected}) {
    const activeClass = 'bg-gray-700 bg-opacity-60';
    const nonActiveClass = 'text-gray-200';

    return (
        <div className="bg-black basis-1/4 [&_*]:text-white rounded-tr-2xl pl-4">
            <h2 className="mt-8 font-semibold text-lg">YOUR PROJECTS</h2>
            <ul className="mt-4">
                <li>
                    <button className={`mb-3 bg-opacity-30 ${ClassesHelpers.grayButton}`} onClick={()=> setProjectSelected(-1)}>+ Add Project</button>
                </li>
                {projects.map((project, index)=> 
                    <li className='mt-2' key={index}> <a className={`mr-6 block pl-4 py-1 cursor-pointer ${(index === projectSelected) ? activeClass : nonActiveClass}`} onClick={()=>setProjectSelected(index)}>{project.title}</a></li>
                )}
            </ul>
        </div>
    )
}