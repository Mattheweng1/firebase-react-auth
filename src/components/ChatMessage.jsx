import { useAuth } from "../contexts/AuthContext"
import styles from '../ChatRoom.module.css'

export default function ChatMessage(props) {
  const { text, uid } = props.message
  const { currentUser } = useAuth()

  const messageClass = uid === currentUser.uid ? styles.sent : styles.received

  return (
    <div className={`${styles.message} ${messageClass}`}>
      <div className={`material-symbols-rounded ${styles.userIcon}`}>person</div>
      <p className={styles.p}>{text}</p>
    </div>
  )
}