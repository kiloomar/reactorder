import firebase from 'firebase/compat/app'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from './App'

export default function Logout() {

    const history = useHistory()
    const authUser = useContext(UserContext)
    useEffect(() => {
        (async () => {
            await firebase.auth().signOut()
            if (!authUser || authUser === "loggedout")
                history.push('/login')
        })()
    })

    return (<></>)
}