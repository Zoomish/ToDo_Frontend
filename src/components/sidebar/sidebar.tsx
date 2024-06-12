import { FC } from 'react'
import { Menu } from 'antd'
import {
  UserOutlined,
  ContactsOutlined,
  DatabaseOutlined,
  RadarChartOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router'

interface ISidebar {
  pathRest: string
  t: (arg0: string) => string
  style: any
  collapse: boolean
  dark: boolean
}
const Sidebar: FC<ISidebar> = ({ dark, collapse, style, pathRest, t }) => {
  const history = useHistory()
  const handleHomeClick = (): void => {
    history.push(`/${pathRest}/home`)
  }
  const handleProjectsClick = (): void => {
    history.push(`/${pathRest}/projects`)
  }
  const handleAdminsClick = (): void => {
    history.push(`/${pathRest}/contact`)
  }
  const handleSkillsClick = (): void => {
    history.push(`/${pathRest}/skills`)
  }

  return (
    <>
      <div
        className='h-8 m-4 text-xl text-center relative z-10 rounded'
        style={style}
      >
        {!collapse ? (
          <p>
            Zoomish <span className='font-medium'>Portfolio</span>
          </p>
        ) : (
          <span className='font-medium'>Z</span>
        )}
      </div>
      <Menu
        theme='light'
        mode='inline'
        style={dark ? style : {}}
        className='relative z-10 text-left bg-transparent'
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key='1' onClick={handleHomeClick}>
          <UserOutlined />
          <span>{t('main')}</span>
        </Menu.Item>
        <Menu.Item key='2' onClick={handleProjectsClick}>
          <DatabaseOutlined />
          <span>{t('projects')}</span>
        </Menu.Item>
        <Menu.Item key='43' onClick={handleSkillsClick}>
          <RadarChartOutlined />
          <span>{t('skills')}</span>
        </Menu.Item>
        <Menu.Item key='4' onClick={handleAdminsClick}>
          <ContactsOutlined />
          <span>{t('contacts')}</span>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Sidebar
