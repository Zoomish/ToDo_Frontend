/* eslint-disable multiline-ternary */
import React, { FC } from 'react'
import { TProject } from '../../utils/typesFromBackend'
import { useLocation } from 'react-router'
import { Button } from 'antd'
import { EyeOutlined, GithubOutlined } from '@ant-design/icons'
import ImageNoPhoto from '../../assets/images/no_photo.png'

interface IRest {
  t: (arg0: string) => string
  projects: TProject[]
}

const Project: FC<IRest> = ({ t, projects }) => {
  const [project, setProject] = React.useState<TProject>()
  const location = useLocation()
  React.useEffect(() => {
    const currentPath = location.pathname
    window.localStorage.setItem('initialRoute', currentPath)
    setProject(projects[Number(location.pathname.split('/')[3]) - 1])
  }, [location.pathname])
  return (
    <div className='w-full h-full flex flex-col justify-start items-center mt-20 z-10'>
      <div className='flex flex-col justify-start items-center gap-1'>
        <img
          src={project?.image}
          onError={(e) => (e.currentTarget.src = ImageNoPhoto)}
          className='w-[450px] h-60 object-contain'
        ></img>
        <p className='text-3xl text-center'>
          {t('title')}: {project?.title}
        </p>
        <p className='text-xl text-center'>
          {t('description')}: {project?.description}
        </p>
        <p className='text-xl text-center'>
          {t('tehnologies')}:{' '}
          {project?.tags
            .replaceAll(' ', '')
            .split(',')
            .map((tag) => {
              return tag + ' '
            })}
        </p>
        <div className='flex justify-around w-full'>
          <Button
            type='primary'
            href={project?.live}
            icon={<EyeOutlined />}
            className='flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'
          >
            {t('overview')}
          </Button>
          <Button
            type='primary'
            href={project?.repository}
            icon={<GithubOutlined />}
            className='flex justify-center items-center bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-indigo-500 to-90%'
          >
            {t('repository')}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Project
