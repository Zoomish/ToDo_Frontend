import React, { FC } from 'react'
import { ECountry } from '../../utils/typesFromBackend'
import { Select } from 'antd'

interface IChangeLanguage {
  t: (arg0: string) => string
  changeLanguage: (lng: ECountry) => void
  dark: boolean
  style: any
}
const ChoiseLanguage: FC<IChangeLanguage> = ({
  t,
  dark,
  style,
  changeLanguage
}) => {
  const restData = Object.keys(ECountry)
  const [selectedOption, setSelectedOption] = React.useState(restData[0])

  React.useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (
      storedLanguage &&
      Object.values(ECountry).includes(storedLanguage as ECountry)
    ) {
      setSelectedOption(storedLanguage)
      document.documentElement.setAttribute(
        'lang',
        storedLanguage.toLocaleLowerCase()
      )
      changeLanguage(storedLanguage as ECountry)
    } else {
      setSelectedOption(restData[0])
      document.documentElement.setAttribute(
        'lang',
        restData[0].toLocaleLowerCase()
      )
      changeLanguage(storedLanguage as ECountry)
    }
  }, [])
  const onFinish = (values: string): void => {
    setSelectedOption(values)
    document.documentElement.setAttribute('lang', values.toLocaleLowerCase())
    changeLanguage(values as ECountry)
    localStorage.setItem('language', values)
  }
  return (
    <>
      {restData ? (
        <Select
          id='my-select'
          value={selectedOption}
          className={dark ? 'black' : 'white'}
          onChange={(e) => onFinish(e)}
        >
          {restData.map((country) => (
            <Select.Option
              key={country}
              value={country}
              style={{ ...style, marginBottom: '1px' }}
            >
              {country}
            </Select.Option>
          ))}
        </Select>
      ) : (
        ''
      )}
    </>
  )
}
export default ChoiseLanguage
