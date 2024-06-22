/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState, useEffect, FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import fullscreenIcon from '../../assets/images/fullscreen.svg'
import Autorization from '../../pages/autorization/autorization'
import { ECountry } from '../../utils/typesFromBackend'
import NotFound from '../../pages/not-found/not-found'
import { useTranslation } from 'react-i18next'
import { NotificationProvider } from '../notification-provider/notification-provider'
import i18n from '../i18n/i18n'
import ChoiseLanguage from '../choise-language/choise-language'
import ProtectedRoute from '../protected-route/protected-route'
import Sidebar from '../sidebar/sidebar'
import Users from '../../pages/tasks/tasks'
import AddRestaurants from '../../pages/add-dish/add-dish'
import Item from '../../pages/dish/dish'
import Admins from '../../pages/categories/categories'
import AddAdmin from '../../pages/add-category/add-category'
import Admin from '../../pages/category/category'
import Dark from '../dark/dark'
import { Footer } from 'antd/es/layout/layout'
import Registration from '../../pages/registration/registration'
import { useTelegram } from '../../services/hooks/use-telegram'

const { Header, Sider, Content } = Layout

interface IMain {
  token: string
  pathRest: string
  setToken: (token: any) => void
}

const Main: FC<IMain> = ({ token, pathRest, setToken }) => {
  // change to TRest
  const { tg } = useTelegram()
  const [language, setLanguage] = useState<ECountry>(
    (localStorage.getItem('language') as ECountry) ?? ECountry.RU
  )
  const [dark, setDark] = useState<boolean>(
    localStorage.getItem('dark') === 'true' ?? false
  )
  const [width, setWidth] = useState<boolean>(false)
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
  const changeLanguage = (lng: ECountry) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18n.changeLanguage(lng)
    setLanguage(lng)
    localStorage.removeItem('formData')
  }
  const style = {
    background: dark ? '#000' : '#fff',
    color: dark ? '#fff' : '#000'
  }
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18n.changeLanguage(
      tg?.initDataUnsafe?.user?.language_code
        ? tg.initDataUnsafe.user.language_code
        : language
    )
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
      setCollapse(!collapse)
      localStorage.setItem('collapse', JSON.stringify(collapse))
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false)
  }, [])

  function handleClickFullScreen(): void {
    if (document.fullscreenElement != null) {
      void document.exitFullscreen()
    } else {
      void document.body.requestFullscreen()
    }
  }

  return (
    <NotificationProvider>
      <Router>
        <Layout style={style}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapse}
            style={style}
            width={'17rem'}
          >
            <Sidebar
              style={style}
              collapse={collapse}
              setIsLoggedIn={setIsLoggedIn}
              pathRest={pathRest}
              t={t}
            />
          </Sider>
          <Layout
            style={{
              ...style,
              paddingLeft: '30px',
              paddingRight: '30px'
            }}
          >
            <Header
              className='siteLayoutBackground'
              style={{
                ...style,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {React.createElement(
                collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: handleToggle,
                  style: style
                }
              )}
              <Dark dark={dark} style={style} setDark={setDark} />
              <ChoiseLanguage
                dark={dark}
                style={style}
                t={t}
                changeLanguage={changeLanguage}
              />
              <div
                className='fullscreen-btn'
                onClick={handleClickFullScreen}
                title='На весь экран'
                style={{ cursor: 'pointer', ...style }}
              >
                <img src={fullscreenIcon} alt='На весь экран' />
              </div>
            </Header>
            <Content
              style={{
                ...style,
                margin: '24px 16px',
                padding: 24,
                minHeight: 'calc(100vh - 114px)'
              }}
            >
              <Switch>
                <Route path={`/:${pathRest}/autorization`}>
                  <Autorization
                    setIsLoggedIn={setIsLoggedIn}
                    t={t}
                    setToken={setToken}
                  />
                </Route>
                <Route path={`/:${pathRest}/registration`}>
                  <Registration
                    setIsLoggedIn={setIsLoggedIn}
                    t={t}
                    setToken={setToken}
                  />
                </Route>
                <ProtectedRoute
                  path={`/:${pathRest}/categories`}
                  exact
                  isLoggedIn={isLoggedIn}
                  pathRest={pathRest}
                >
                  <Admins
                    token={token}
                    pathRest={pathRest}
                    t={t}
                    language={language}
                  />
                </ProtectedRoute>
                <ProtectedRoute
                  path={`/:${pathRest}/category/:categoryId`}
                  exact
                  isLoggedIn={isLoggedIn}
                  pathRest={pathRest}
                >
                  <Admin token={token} pathRest={pathRest} t={t} />
                </ProtectedRoute>
                <ProtectedRoute
                  path={`/:${pathRest}/add/category`}
                  exact
                  isLoggedIn={isLoggedIn}
                  pathRest={pathRest}
                >
                  <AddAdmin token={token} pathRest={pathRest} t={t} />
                </ProtectedRoute>
                <ProtectedRoute
                  path={`/:${pathRest}/dishes`}
                  exact
                  isLoggedIn={isLoggedIn}
                  pathRest={pathRest}
                >
                  <Users
                    token={token}
                    pathRest={pathRest}
                    t={t}
                    language={language}
                  />
                </ProtectedRoute>
                <ProtectedRoute
                  path={`/:${pathRest}/dish/:dishId`}
                  exact
                  isLoggedIn={isLoggedIn}
                  pathRest={pathRest}
                >
                  <Item
                    token={token}
                    pathRest={pathRest}
                    t={t}
                    language={language}
                  />
                </ProtectedRoute>
                <ProtectedRoute
                  path={`/:${pathRest}/add/dish`}
                  exact
                  isLoggedIn={isLoggedIn}
                  pathRest={pathRest}
                >
                  <AddRestaurants token={token} pathRest={pathRest} t={t} />
                </ProtectedRoute>
                <Route path='*'>
                  <NotFound t={t} />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
        <Footer style={style}>
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
