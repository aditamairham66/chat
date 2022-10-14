import { Session } from 'next-auth'
import React from 'react'

interface Props {
    session: Session
}
const FeedWrapper:React.FC<Props> = () => {
  return (
    <div>FeedWrapper</div>
  )
}

export default FeedWrapper