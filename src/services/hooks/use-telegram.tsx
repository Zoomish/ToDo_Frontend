declare const window: any
const tg = window.Telegram.WebApp

export function useTelegram(): Object {
  const onClose = (): void => {
    tg.close()
  }

  const onToggleButton = (): void => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id
  }
}
