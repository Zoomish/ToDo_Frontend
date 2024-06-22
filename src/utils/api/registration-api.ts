/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useTelegram } from '../../services/hooks/use-telegram'
import { BASE_URL } from '../const'
import { handleResponse } from '../helpers'

const { tg } = useTelegram()

export const registration = async (button: any) => {
  await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...button
    })
  }).then(async (res) => await handleResponse(res))
  return tg.sendData(
    JSON.stringify(Object.assign({ operation: 'registration' }, button))
  )
}
