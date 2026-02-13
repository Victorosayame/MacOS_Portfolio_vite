//step36

import { locations } from "#constants"
import useLocationStore from "#store/loaction"
import useWindowStore from "#store/window"
import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import {Draggable} from "gsap/Draggable"


const projects = locations.work?.children ?? []

const Home = () => {

  //step37 make the files on the home page draggable using Gsap
  useGSAP(() => {
    Draggable.create(".folder")
  }, [])

  //step38 use the use windowstore hook to make them open when clicked
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();


  //step39
  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project)
    openWindow("finder")
  }
  return (
    <section id='home'>
      <ul>{projects.map((project) => (
        <li key={project.id} className={clsx("group folder", project.windowPosition)} onClick={() => handleOpenProjectFinder(project)}>
          <img 
            src="/images/folder.png"
            alt={project.name}
          />
          <p>{project.name}</p>
        </li>
      ))}</ul>
    </section>
  )
}

export default Home