import LeftNav from "./Components/LeftNav";
import NoProject from "./Components/NoProject";
import CreateProj from "./Components/CreateProj";
import Project from "./Components/Project";
import {ProjectHandle} from "./Components/Project";

import { useState, useEffect, useRef } from "react";
import { ProjectData } from "./DataModel/Project";
import React from "react";

function App() {
  const [projectSelected, setProjectSelected] = useState<number|undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>(()=>{
    let proj: ProjectData = new ProjectData(
      "Test title",
      "Some long description with stuff",
      new Date('2024-10-25'));
      proj.addTask('task 1');
      proj.addTask('task 2');
    return [proj];
  });

  const addProject = (title: string, description: string, date: Date)=>{
    setProjects((old)=>{
      return [
        ...old,
        new ProjectData(title, description, date)
      ]
    });
  };

  const [deletingProject, setDeletingProject] = useState<number|undefined>(undefined);

  useEffect(()=>{
    if (projectSelected === -1) {
      setProjectSelected(projects.length - 1);
    }
  }, [projects]);

  useEffect(()=>{
    if ((deletingProject !== undefined) && 
      (deletingProject >= 0)) {
      setProjects((old: ProjectData[])=>{
        if (deletingProject !== undefined) {
          let copy: ProjectData[] = [...old];
          copy.splice(deletingProject, 1);
          return copy;
        }
        return old;
      });
      setDeletingProject(undefined);
    }
  }, [projectSelected]);

  let projectRef = useRef<ProjectHandle>(null);
  const updateSelectedProject = (idx: number)=>{
    setProjectSelected(idx);
    if ((projectRef.current) && (idx >= 0)) {
      projectRef.current.updateTasks(projects[idx].tasks);
    }
  };

  let deleteProj = ()=>{
    setDeletingProject(projectSelected);
    setProjectSelected(undefined);
  };

  let proj = <NoProject setProjectSelected={updateSelectedProject} />;
  if ((projectSelected !== undefined) && (projectSelected === -1)) {
    proj = <CreateProj setProjectSelected={setProjectSelected} addProject={addProject}/>;
  } else if (projectSelected !== undefined) {
    proj = <Project 
      project={projects[projectSelected]} 
      ref={projectRef}
      deleteProj={deleteProj}
      />
  }

  return (
    <>
      <h1 className="my-8 text-center text-5xl font-bold mb-20">React Project Manager</h1>
      <div className="flex basis-full">
        <LeftNav projects={projects} setProjectSelected={updateSelectedProject} projectSelected={projectSelected}/>
        {proj}
      </div>
    </>
  );
}

export default App;
