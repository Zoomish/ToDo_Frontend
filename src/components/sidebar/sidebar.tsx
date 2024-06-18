import { Dispatch, FC, SetStateAction } from 'react'
import { Menu } from 'antd'
import {
  InfoCircleOutlined,
  LogoutOutlined,
  ContainerOutlined,
  GroupOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router'

interface ISidebar {
  collapse: boolean
  style: Object
  pathRest: string
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  t: (arg0: string) => string
}
const Sidebar: FC<ISidebar> = ({
  collapse,
  style,
  setIsLoggedIn,
  pathRest,
  t
}) => {
  const history = useHistory()
  const handleDishesClick = (): void => {
    history.push(`/${pathRest}/dishes`)
  }
  const handleCategoriesClick = (): void => {
    history.push(`/${pathRest}/categories`)
  }
  const handleInstructionClick = (): void => {
    history.push(`/${pathRest}/blog`)
  }
  const handleRestClick = (): void => {
    history.push(`/${pathRest}/dishes`)
  }

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    history.push(`/${pathRest}/autorization`)
  }

  return (
    <>
      <div
        className='h-8 m-4 text-xl text-center relative z-10 rounded'
        style={style}
      >
        {!collapse ? (
          <p>
            <a href='https://github.com/Zoomish'>Zoomish</a>{' '}
            <span className='font-medium'>ToDo</span>
          </p>
        ) : (
          <a className='font-medium' href='https://github.com/Zoomish'>
            Z
          </a>
        )}
      </div>
      <Menu
        theme='light'
        mode='inline'
        style={{ textAlign: 'left', ...style }}
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key='1' onClick={handleDishesClick}>
          <ContainerOutlined />
          <span>{t('dishes')}</span>
        </Menu.Item>
        <Menu.Item key='2' onClick={handleCategoriesClick}>
          <GroupOutlined />
          <span>{t('categories')}</span>
        </Menu.Item>
        <Menu.Item key='3' onClick={handleInstructionClick}>
          <InfoCircleOutlined />
          <span>{t('manual')}</span>
        </Menu.Item>
        <Menu.Item key='4' onClick={handleRestClick}>
          <VerticalAlignTopOutlined />
          <span> {t('back-menu')}</span>
        </Menu.Item>
        <Menu.Item key='5' onClick={handleLogout}>
          <LogoutOutlined />
          <span>{t('quit')}</span>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Sidebar
