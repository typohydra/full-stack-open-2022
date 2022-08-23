import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === '') {
    return null
  }

  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const errorStyle = { color: 'red' }
  const successStyle = { color: 'green' }

  if (message.style === 'error') {
    return <div style={{ ...errorStyle, ...messageStyle }}>{message.text}</div>
  } else {
    return (
      <div style={{ ...successStyle, ...messageStyle }}>{message.text}</div>
    )
  }
}

export default Notification
