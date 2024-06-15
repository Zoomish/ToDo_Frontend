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
import Users from '../../pages/users/users'
import AddRestaurants from '../../pages/add-dish/add-dish'
import Item from '../../pages/dish/dish'
import Admins from '../../pages/categories/categories'
import AddAdmin from '../../pages/add-category/add-category'
import Admin from '../../pages/category/category'
import Dark from '../dark/dark'
import { Footer } from 'antd/es/layout/layout'

const { Header, Sider, Content } = Layout

interface IMain {
  token: string
  pathRest: string
  setToken: (token: any) => void
}

const Main: FC<IMain> = ({ token, pathRest, setToken }) => {
  // change to TRest
  const [language, setLanguage] = useState<ECountry>(
    (localStorage.getItem('language') as ECountry) ?? ECountry.RU
  )
  const [dark, setDark] = useState<boolean>(
    localStorage.getItem('dark') === 'true' ?? false
  )
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
    i18n.changeLanguage(language)
  }, [])
  const [collapse, setCollapse] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false)
  }, [])

  const handleToggle = (event: any): void => {
    event.preventDefault()
    setCollapse(!collapse)
  }

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
              <Dark dark={dark} setDark={setDark} />
              <ChoiseLanguage t={t} changeLanguage={changeLanguage} />
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
