import React from 'react'
import Message from '../../../Layout/components/Message'

/**
* @author
* @function UserNotifications
**/

const UserNotifications = (props) => {
  document.title="My Notifications"
  return (
    <div>
      <Message
        heading="coming soon"
        message="We are woring on this page"
      />
    </div>
  )
}


export default UserNotifications