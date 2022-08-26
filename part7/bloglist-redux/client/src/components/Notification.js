import { useSelector } from 'react-redux'
import { ErrorNotification, SuccessNotification } from '../StyledComponents/notification.styled'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === '') {
    return null
  }

  if (message.style === 'error') {
    return <ErrorNotification>{message.text}</ErrorNotification>
  } else {
    return <SuccessNotification>{message.text}</SuccessNotification>
  }
}

export default Notification
