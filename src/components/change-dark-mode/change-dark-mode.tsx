import { Button } from 'antd'
import React, { FC } from 'react'
import { SunFilled, MoonOutlined } from '@ant-design/icons'

interface IChangeLanguage {
  dark: boolean
  changeDark: () => void
  style: any
}
const ChangeDark: FC<IChangeLanguage> = ({ style, dark, changeDark }) => {
  return (
    <Button
    className='flex justify-center items-center'
      icon={!dark ? <MoonOutlined /> : <SunFilled />}
      onClick={() => changeDark()}
      style={{ width: '40px', ...style }}
    />
  )
}
export default ChangeDark
