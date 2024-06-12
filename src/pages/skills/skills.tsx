import React, { FC } from 'react'
import { ECountry, TSkill } from '../../utils/typesFromBackend'
import { useLocation } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import { FreeMode, Autoplay } from 'swiper/modules'

interface ISkill {
  t: (arg0: string) => string
  language: ECountry
  skills: TSkill[]
}

const Skill: FC<ISkill> = ({ t, skills }) => {
  const location = useLocation()
  React.useEffect(() => {
    const currentPath = location.pathname
    window.localStorage.setItem('initialRoute', currentPath)
  }, [])
  return (
    <div className='flex flex-col justify-center  w-full h-full z-10'>
      <p className='md:text-4xl text-2xl text-center mb-10'>{t('my_skills')}</p>
      <div className='flex justify-center items-center flex-wrap w-full h-full gap-2 relative'>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          initialSlide={1}
          loop={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            370: {
              slidesPerView: 2
            },
            510: {
              slidesPerView: 3
            },
            640: {
              slidesPerView: 4
            },
            730: {
              slidesPerView: 5
            }
          }}
          className='w-full h-40 flex items-center justify-center'
        >
          {skills.map((skill: TSkill, index) => {
            return (
              <SwiperSlide
                key={index}
                className='flex justify-center items-center flex-col '
              >
                <div className='flex justify-center items-center flex-col w-40 h-40'>
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className='w-20 h-20'
                  />
                  <p className='md:text-2xl text-lg'>{skill.title}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          initialSlide={6}
          loop={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{
            delay: 2000,
            reverseDirection: true,
            disableOnInteraction: false
          }}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            370: {
              slidesPerView: 2
            },
            510: {
              slidesPerView: 3
            },
            640: {
              slidesPerView: 4
            },
            730: {
              slidesPerView: 5
            }
          }}
          className='w-full h-40 flex items-center justify-center'
        >
          {skills.map((skill: TSkill, index) => {
            return (
              <SwiperSlide
                key={index}
                className='flex justify-center items-center flex-col '
              >
                <div className='flex justify-center items-center flex-col w-40 h-40'>
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className='w-20 h-20'
                  />
                  <p className='md:text-2xl text-lg'>{skill.title}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          initialSlide={12}
          loop={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            370: {
              slidesPerView: 2
            },
            510: {
              slidesPerView: 3
            },
            640: {
              slidesPerView: 4
            },
            730: {
              slidesPerView: 5
            }
          }}
          className='w-full h-40 flex items-center justify-center mb-40'
        >
          {skills.map((skill: TSkill, index) => {
            return (
              <SwiperSlide
                key={index}
                className='flex justify-center items-center flex-col '
              >
                <div className='flex justify-center items-center flex-col w-40 h-40'>
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className='w-20 h-20'
                  />
                  <p className='md:text-2xl text-lg'>{skill.title}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
export default Skill
