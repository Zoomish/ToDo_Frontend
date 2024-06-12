/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState, useEffect, FC, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { FloatButton, Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RobotOutlined
} from '@ant-design/icons'
import fullscreenIcon from '../../assets/images/fullscreen.svg'
import { ECountry, TUser } from '../../utils/typesFromBackend'
import NotFound from '../../pages/not-found/not-found'
import { useTranslation } from 'react-i18next'
import { NotificationProvider } from '../notification-provider/notification-provider'
import i18n from '../i18n/i18n'
import ChoiseLanguage from '../choise-language/choise-language'
import Sidebar from '../sidebar/sidebar'
import Project from '../../pages/project/project'
import Contact from '../../pages/contact/contact'
import Home from '../../pages/home/home'
import * as userApi from '../../utils/api/user-api'
import { NotificationContext } from '../../components/notification-provider/notification-provider'
import ChangeDark from '../change-dark-mode/change-dark-mode'
import HeaderPhoto from '../../assets/images/header-bg.png'
import Grass from '../../assets/images/realistic_banner_with_grass.png'
import Losa from '../../assets/images/leaf212.png'
import Up from '../../assets/images/up.png'
import Projects from '../../pages/projects/projectss'
import Skill from '../../pages/skills/skills'

const { Header, Sider, Content, Footer } = Layout

interface IMain {
  pathRest: string
}

const Main: FC<IMain> = ({ pathRest }) => {
  const { openNotification } = useContext(NotificationContext)
  const [user, setUser] = useState<TUser>()
  const [dark, setDark] = useState<boolean>(false)
  const [width, setWidth] = useState<boolean>(false)
  const [language, setLanguage] = useState<ECountry>(
    (localStorage.getItem('language') as ECountry) ?? ECountry.RU
  )
  const { t } = useTranslation()
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
  const changeLanguage = (lng: ECountry) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18n.changeLanguage(lng)
    setLanguage(lng)
    localStorage.removeItem('formData')
  }

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const deleteTime = localStorage.getItem('deleteTime')
    if (savedUser && deleteTime && +new Date() - parseInt(deleteTime) < 0) {
      setUser(JSON.parse(savedUser))
    } else {
      userApi
        .getAllUsers()
        .then((res: TUser) => {
          setUser(res)
          localStorage.setItem(
            'deleteTime',
            String(+new Date() + 3600 * 1000 * 24)
          )
          localStorage.setItem('user', JSON.stringify(res))
        })
        .catch((e) => openNotification(e, 'topRight'))
    }
  }, [])

  const changeDark = (): void => {
    setDark(!dark)
    localStorage.setItem('dark', String(!dark))
  }

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18n.changeLanguage(language)
  }, [])
  const [collapse, setCollapse] = useState(false)
  let flag = false
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', function resizeHandler() {
      if (window.innerWidth < 768 && !flag) {
        setCollapse(true)
        setWidth(true)
        flag = true
      } else if (window.innerWidth >= 768 && flag) {
        setCollapse(false)
        setWidth(false)
        flag = false
      }
    })
  }
  useEffect(() => {
    setDark(localStorage.getItem('dark') === 'true')
    window.innerWidth <= 768 ? setCollapse(true) : setCollapse(false)
    window.innerWidth <= 768 ? setWidth(true) : setWidth(false)
  }, [])

  const handleToggle = (event: any): void => {
    event.preventDefault()
    if (!width) {
      collapse ? setCollapse(false) : setCollapse(true)
    }
  }

  function handleClickFullScreen(): void {
    if (document.fullscreenElement != null) {
      void document.exitFullscreen()
    } else {
      void document.body.requestFullscreen()
    }
  }
  const color = {
    background: dark ? '#000' : '#fff',
    color: dark ? '#fff' : '#000'
  }

  return (
    <NotificationProvider>
      <Router>
        <Layout className='relative'>
          <Sider
            trigger={null}
            collapsible
            className='relative'
            collapsedWidth='50'
            collapsed={collapse}
            style={color}
            width={'13rem'}
          >
            <Sidebar
              dark={dark}
              collapse={collapse}
              style={color}
              pathRest={pathRest}
              t={t}
            />
            <div className='absolute flex flex-col justify-start items-end w-full h-full overflow-clip top-0 left-1'>
              {!dark ? (
                <>
                  <img className='w-20' src={Losa}></img>
                  <img className='w-20 absolute top-40' src={Losa}></img>
                  {collapse ? (
                    <>
                      <img className='w-20 absolute top-80' src={Losa}></img>
                      <img className='w-20 absolute top-96' src={Losa}></img>
                      <img className='w-20 absolute bottom-20' src={Losa}></img>
                    </>
                  ) : (
                    ''
                  )}
                  <img className='w-20 absolute bottom-40' src={Losa}></img>
                  <img className='w-20 absolute bottom-0' src={Losa}></img>
                </>
              ) : (
                ''
              )}
            </div>
          </Sider>
          <Layout
            className='relative'
            style={{
              ...color,
              paddingLeft: '10px',
              paddingRight: '30px'
            }}
          >
            <Header
              className='siteLayoutBackground'
              style={{
                padding: 0,
                ...color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div className='absolute flex justify-center items-center w-full h-full -left-5 overflow-clip'>
                {!dark ? (
                  <>
                    <img
                      className='mb-40 w-[817px] max-w-screen-2xl h-60'
                      src={Up}
                    ></img>
                    <img className='mb-40 w-[817px] h-60' src={Up}></img>
                    <img className='mb-40 w-[817px] h-60' src={Up}></img>
                  </>
                ) : (
                  ''
                )}
              </div>
              {!width
                ? React.createElement(
                    collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: 'trigger z-10',
                      onClick: handleToggle,
                      style: color
                    }
                  )
                : ''}
              <ChoiseLanguage
                dark={dark}
                style={color}
                t={t}
                changeLanguage={changeLanguage}
              />
              <ChangeDark style={color} dark={dark} changeDark={changeDark} />
              <div
                className='fullscreen-btn z-10'
                onClick={handleClickFullScreen}
                title='На весь экран'
                style={{ cursor: 'pointer' }}
              >
                <img src={fullscreenIcon} alt='На весь экран' />
              </div>
            </Header>
            <Content
              className='flex flex-col relative mb-5'
              style={{
                marginTop: 24,
                padding: 0,
                paddingBottom: 0,
                minHeight: 'calc(100vh - 135px)',
                ...color
              }}
            >
              <Switch>
                <Route path={`/:${pathRest}/home`} exact>
                  {user ? <Home t={t} user={user} /> : <></>}
                </Route>
                <Route path={`/:${pathRest}/projects`} exact>
                  {user?.projects ? (
                    <Projects
                      dark={dark}
                      pathRest={pathRest}
                      t={t}
                      language={language}
                      projects={user.projects}
                    />
                  ) : (
                    <></>
                  )}
                </Route>
                <Route path={`/:${pathRest}/projects/:projectId`} exact>
                  {user?.projects ? (
                    <Project t={t} projects={user?.projects} />
                  ) : (
                    <></>
                  )}
                </Route>
                <Route path={`/:${pathRest}/contact`} exact>
                  {user ? (
                    <Contact
                      pathRest={pathRest}
                      user={user}
                      t={t}
                      language={language}
                    />
                  ) : (
                    <></>
                  )}
                </Route>
                <Route path={`/:${pathRest}/skills`} exact>
                  {user?.skills ? (
                    <Skill skills={user.skills} t={t} language={language} />
                  ) : (
                    <></>
                  )}
                </Route>
                <Route path='*'>
                  <NotFound t={t} />
                </Route>
              </Switch>
              <FloatButton
                icon={<RobotOutlined />}
                href={`https://t.me/${user ? user?.tg_bot : ''}`}
                target='_blank'
                type='primary'
                className='w-12 h-12 flex justify-center'
                style={{ right: 24 }}
              />
              <div className='absolute flex justify-center items-center w-full h-full overflow-clip'>
                {dark ? <img className='mb-40' src={HeaderPhoto}></img> : ''}
              </div>
            </Content>
          </Layout>
          <div className='absolute flex justify-end items-end overflow-clip bottom-0'>
            {dark ? (
              ''
            ) : (
              <>
                <img
                  src={Grass}
                  className={'w-full max-w-screen-2xl max-h-40 min-h-20'}
                />
                <img
                  src={Grass}
                  className={'w-full max-w-screen-2xl max-h-40 min-h-20'}
                />
                <img
                  src={Grass}
                  className={'w-full max-w-screen-2xl max-h-40 min-h-20'}
                />
                <img
                  src={Grass}
                  className={'w-full max-w-screen-2xl max-h-40 min-h-20'}
                />
                <img
                  src={Grass}
                  className={'w-full max-w-screen-2xl max-h-40 min-h-20'}
                />
              </>
            )}
          </div>
        </Layout>
        <Footer style={{ ...color, paddingBottom: '2px' }}>
          <div className='border-t flex justify-center text-center'>
            Copyright &copy; {new Date().getFullYear()} Zoomish. All rights
            reserved.
          </div>
        </Footer>
      </Router>
    </NotificationProvider>
  )
}

export default Main
