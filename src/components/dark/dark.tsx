import { MoonOutlined, SunFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC } from 'react'

interface IDark {
  dark: Boolean
  setDark: (lng: Boolean) => void
}
const Dark: FC<IDark> = ({ setDark, dark }) => {
  return (
    <>
      <Button
        className='flex justify-center items-center'
        icon={!dark ? <MoonOutlined /> : <SunFilled />}
        onClick={() => setDark(!dark)}
      />
    </>
  )
}
export default Dark
