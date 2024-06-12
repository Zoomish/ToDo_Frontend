import React, { FC } from 'react'
import { TUser } from '../../utils/typesFromBackend'
import { useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

interface IMenu {
  t: (arg0: string) => string
  user: TUser
}

const Home: FC<IMenu> = ({ user, t }) => {
  const location = useLocation()

  React.useEffect(() => {
    const currentPath = location.pathname
    window.localStorage.setItem('initialRoute', currentPath)
  }, [])
  const expirience = Math.ceil(
    (new Date(new Date().toISOString().split('T')[0]).getTime() -
      new Date(user.expirience).getTime()) /
      (1000 * 60 * 60 * 24 * 30)
  )
  const age = (age: number): string => {
    let txt
    let count = age % 100
    if (count >= 5 && count <= 20) {
      txt = 'лет'
    } else {
      count = count % 10
      if (count === 1) {
        txt = 'год'
      } else if (count >= 2 && count <= 4) {
        txt = 'года'
      } else {
        txt = 'лет'
      }
    }
    return txt
  }
  const month = (month: number): string => {
    if (month === 1) {
      return 'месяц'
    } else if (month > 1 && month < 5) {
      return 'месяца'
    } else if (month > 4) {
      return 'месяцев'
    } else {
      return ''
    }
  }
  const work = user.work.replaceAll(' ', '').split(',')
  return (
    <div className='flex flex-col justify-center items-center w-full h-full relative mb-60 z-10'>
      <p className='text-4xl text-center'>{t('hi')} {user?.name}</p>
      <span className='text-3xl text-center text-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5 mt-2 px-2 py-1 rounded text-white'>
        Frontend Developer
      </span>
      <p className='text-2xl text-center mb-1'>{t('expirience')}</p>
      <span className='mb-6 text-2xl text-nowrap bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded text-white px-2 py-1'>
        {Math.floor(expirience / 12)} {age(Math.floor(expirience / 12))}&nbsp;
        {expirience % 12} {month(expirience % 12)}
      </span>
      <p className='text-2xl text-center'>{t('work_in')}</p>
      <a
        target='_blank'
        rel='noreferrer'
        href={work[0]}
        className='no-underline text-2xl text-center text-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5 mt-2 px-2 py-1 rounded text-white'
      >
        {work[1]}
      </a>
      <Button
        type='primary'
        className='flex items-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
        shape='round'
        href='https://drive.google.com/uc?export=download&id=17lSIxgIi6vfyyz_VfC95nR169hy639FC'
        icon={<DownloadOutlined />}
        size={'large'}
      >
        {t('download_cv')}
      </Button>
    </div>
  )
}
export default Home
