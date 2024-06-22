/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

import { useTelegram } from '../services/hooks/use-telegram'

const { tg } = useTelegram()
export const handleResponse = async (response: Response) => {
  if (response.ok) return await response.json()
  else if (response.status === 401) {
    localStorage.removeItem('token')
    tg.sendData(
      JSON.stringify(
        Object.assign({
          operation: 'badtoken',
          tg_id: tg.initDataUnsafe.user.id
        })
      )
    )
    location.reload()
  } else return await Promise.reject(response.status)
}
