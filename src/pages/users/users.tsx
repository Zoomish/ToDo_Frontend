import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useContext } from 'react'
import { ECountry, TDish } from '../../utils/typesFromBackend'
import * as userAPI from '../../utils/api/user-api'
import { Link, NavLink, useLocation } from 'react-router-dom'
import imageNoPhoto from '../../assets/images/no_photo.png'
import { BASE_URL_CDN } from '../../utils/const'
import { NotificationContext } from '../../components/notification-provider/notification-provider'

interface InameTariffs {
  text: string
  value: string
}

interface IMenu {
  token: string
  pathRest: string
  t: (arg0: string) => string
  language: ECountry
}

const Dishes: FC<IMenu> = ({ token, pathRest, t }) => {
  const { openNotification } = useContext(NotificationContext)

  const [data, setData] = React.useState<TDish[]>([])
  const [nameTariffs, setnameTariffs] = React.useState<InameTariffs[]>([])
  const location = useLocation()

  React.useEffect(() => {
    userAPI
      .getUsers(token)
      .then((res) => {
        setData(res)
        const objectNames: { [key: string]: boolean } = {}
        const resultArraynameTariffs: InameTariffs[] = []
        res.forEach((dish: TDish) => {
          // if (!objectNames[dish.category as TCategory]) {
          //   objectNames[dish.price as string] = true
          // }
        })
        for (const key of Object.keys(objectNames)) {
          resultArraynameTariffs.push({ text: key, value: key })
        }
        setnameTariffs(resultArraynameTariffs)
      })
      .catch((e) => openNotification(e, 'topRight'))
    const currentPath = location.pathname
    window.localStorage.setItem('initialRoute', currentPath)
  }, [])

  const columns: ColumnsType<TDish> = [
    {
      title: `${t('image')}`,
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img
          src={`${BASE_URL_CDN}/${image}`}
          style={{ width: '100px', height: '100px', objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.src = imageNoPhoto
          }}
        />
      )
    },
    {
      title: `${t('name')}`,
      dataIndex: 'title',
      key: 'title',
      render: (email, user) => (
        <Link to={`/${pathRest}/dish/:${user.id}`}>{user.email}</Link>
      ),
      sorter: (a, b) => {
        if (a.email !== undefined && b.email !== undefined) {
          return a.email.localeCompare(b.email)
        }
        return 0
      }
    },
    {
      title: `${t('category')}`,
      dataIndex: 'category.title',
      key: 'category.title',
      render: (roles, user) => (
        <Link to={`/${pathRest}/category/:${user.id}`}>
          {user.id}
        </Link>
      ),
      sorter: (a, b) => {
        if (a.id !== undefined && b.id !== undefined) {
          return a.id.localeCompare(b.id)
        }
        return 0
      }
    },
  // {
  //  title: `${t('price')}`,
  //  dataIndex: 'price',
  //  key: 'price',
  //  render: (price) => <p>{price}</p>,
  //  sorter: (a, b) => a.price - b.price,
  //  filters: [...nameTariffs],
  //  onFilter: (value: string | number | boolean, record) =>
  //    record.price === value
  // }
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          marginBottom: '1rem',
          alignItems: 'center',
          outline: 'none',
          padding: '0'
        }}
      >
        <div style={{ display: 'block', marginRight: 'auto' }}>
          <h2 style={{ fontWeight: 600, marginBottom: '0' }}>{t('dishes')}</h2>
          <p style={{ marginBottom: '0' }}>{t('your-list-of-dishes')}</p>
        </div>
        <NavLink
          to={`/${pathRest}/add/dish`}
          style={{
            color: '#fff',
            backgroundColor: '#2bc155',
            borderColor: '#2bc155',
            width: '145px',
            height: '61px',
            borderRadius: '0.375rem',
            fontWeight: '500',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {t('add')}
        </NavLink>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
export default Dishes
