import React, { FC } from 'react'
import { ECountry, TUser } from '../../utils/typesFromBackend'
import { useLocation } from 'react-router'
interface IContact {
  pathRest: string
  t: (arg0: string) => string
  language: ECountry
  user: TUser
}

const Contact: FC<IContact> = ({ pathRest, t, user }) => {
  const location = useLocation()
  React.useEffect(() => {
    const currentPath = location.pathname
    window.localStorage.setItem('initialRoute', currentPath)
  }, [])
  return (
    <div className='flex flex-col justify-center  w-full h-full z-10'>
      <p className='md:text-4xl text-2xl text-center mb-10'>
        {t('my_contacts')}
      </p>
      <div className='flex justify-center items-center flex-wrap w-full h-full relative mb-40'>
        <div className='sm:w-1/2 w-full h-32 flex items-center flex-col'>
          <p className='text-xl font-normal text-center'>{t('email-address')}</p>
          <p className='text-base mt-3 text-center'>
            <a href={`mailto:${user.email}?subject=Job`}>{user.email}</a>
          </p>
        </div>
        <div className='sm:w-1/2 w-full h-32 flex items-center flex-col'>
          <p className='text-xl font-normal text-center'>{t('contact-phone-number')}</p>
          <p className='text-base mt-3 text-center'>{user.phone}</p>
        </div>
        <div className='sm:w-1/2 w-full h-32 flex items-center flex-col'>
          <p className='text-xl font-normal text-center'>{t('telegram')}</p>
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://t.me/${user.tg}`}
            className='text-base mt-3 text-center'
          >
            {user.tg}
          </a>
        </div>
        <div className='sm:w-1/2 w-full h-32 flex items-center flex-col'>
          <p className='text-xl font-normal text-center'>{t('telegram-bot')}</p>
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://t.me/${user.tg_bot}`}
            className='text-base mt-3 text-center'
          >
            {user.tg_bot}
          </a>
        </div>
      </div>
    </div>
  )
}
export default Contact
