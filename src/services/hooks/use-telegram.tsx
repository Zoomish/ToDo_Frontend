declare const window: any
const tg = window.Telegram.WebApp

export function useTelegram(): any {
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
