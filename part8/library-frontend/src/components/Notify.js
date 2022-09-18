const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red', border: 'red solid', margin: '10px 0px', padding: '10px'}}>
        {errorMessage}
    </div>
  )
}

export default Notify

