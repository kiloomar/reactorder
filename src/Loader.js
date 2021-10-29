import { useContext } from "react"
import { Redirect } from "react-router-dom"
import { UserContext } from "./App"
import Loading from "./Loading"

export default function Loader(props) {

    const authUser = useContext(UserContext)

    return (
        authUser ?
            authUser !== "loggedout" ?
                { ...props.children }
                :
                props.public ?
                    { ...props.children }
                    :
                    <Redirect to="/login" />
            :
            <Loading />
    )
}