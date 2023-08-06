import { firestore } from "../firebaseInit"
import { collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore"
import ChatMessage from "./ChatMessage"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import styles from '../ChatRoom.module.css'

export default function ChatRoom() {
  const dummy = useRef()
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')
  const { currentUser } = useAuth()

  const messagesRef = collection(firestore, 'messages')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid } = currentUser

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchMessages = () => {
      const messagesRef = collection(firestore, 'messages')
      const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(25))

      const unsub = onSnapshot(messagesQuery, (querySnapshot) => {
        const data = querySnapshot.docs
        setMessages(data)
        setTimeout(() => {
          dummy.current.scrollIntoView({ behavior: 'smooth' })
        })
        
        console.log('Received data')
      })

      return () => unsub()
    }

    fetchMessages()
  }, [])

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>⚛️ 🔥 💬</h1>
        <Link to='/'><button className={styles.button}>Return to Dashboard</button></Link>
      </header>

      <section className={styles.section}>
        <main className={styles.main}>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg.data()} />).toReversed()}
          <span ref={dummy}></span>
        </main>
        <form onSubmit={sendMessage} className={styles.form}>
          <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} className={styles.input} />
          <button type="submit" disabled={!formValue} className={`material-symbols-rounded ${styles.button}`}>send</button>
        </form>
      </section>
    </div>
  )
}