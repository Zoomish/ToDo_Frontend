import React, { FC } from 'react'
import { ECountry, TProject } from '../../utils/typesFromBackend'
import { useLocation } from 'react-router-dom'
import ProjectView from '../../components/projectView/projectView'

interface IMenu {
  pathRest: string
  t: (arg0: string) => string
  language: ECountry
  projects: TProject[]
  dark: boolean
}

const Projects: FC<IMenu> = ({ projects, dark, t }) => {
  const location = useLocation()
  React.useEffect(() => {
    const currentPath = location.pathname
    window.localStorage.setItem('initialRoute', currentPath)
  }, [])
  return (
    <div className='flex flex-col justify-center  w-full h-full z-10'>
      <p className='md:text-4xl text-2xl text-center mb-10'>{t('my_projects')}</p>
      <div className='flex justify-center flex-wrap w-full h-full gap-2 relative'>
        {projects.map((project, index) => (
          <ProjectView key={index} dark={dark} project={project}></ProjectView>
        ))}
      </div>
    </div>
  )
}
export default Projects
