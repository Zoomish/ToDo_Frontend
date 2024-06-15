import { MoonOutlined, SunFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC } from 'react'

interface IDark {
  style: Object
  dark: boolean
  setDark: (lng: boolean) => void
}
const Dark: FC<IDark> = ({ style, setDark, dark }) => {
  React.useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark))
  }, [dark])
  return (
    <>
      <Button
        style={style}
        className='flex justify-center items-center'
        icon={!dark ? <MoonOutlined /> : <SunFilled />}
        onClick={() => setDark(!dark)}
      />
    </>
  )
}
export default Dark
