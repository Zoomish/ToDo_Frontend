import React, { FC } from 'react'
import { ECountry } from '../../utils/typesFromBackend'
import { Select } from 'antd'

interface IChangeLanguage {
  dark: boolean
  style: Object
  t: (arg0: string) => string
  changeLanguage: (lng: ECountry) => void
}
const ChoiseLanguage: FC<IChangeLanguage> = ({
  t,
  dark,
  style,
  changeLanguage
}) => {
  const [selectedOption, setSelectedOption] = React.useState('')
  const restData = Object.keys(ECountry)
  React.useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (
      storedLanguage &&
      Object.values(ECountry).includes(storedLanguage as ECountry)
    ) {
      setSelectedOption(storedLanguage)
      changeLanguage(storedLanguage as ECountry)
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onFinish = (values: any) => {
    setSelectedOption(values)
    changeLanguage(values)
    localStorage.setItem('language', values)
    localStorage.removeItem('formDataDish')
  }
  return (
    <>
      {restData ? (
        <Select
          style={style}
          id='my-select'
          className={dark ? 'black' : 'white'}
          value={selectedOption || restData[0]}
          onChange={(e) => onFinish(e)}
        >
          {restData.map((country) => (
            <Select.Option
              key={country}
              classname={'mb-1'}
              style={style}
              value={country}
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
