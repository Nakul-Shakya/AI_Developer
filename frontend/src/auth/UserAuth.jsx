import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/user.context'
import { Navigate } from 'react-router-dom';


const UserAuth = ({children}) => {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    if (user) {
        setLoading(false)
    }


    if(loading) {
        return <div>Loading...</div>
    }

    useEffect(() => {
      
        if(!token){
            Navigate('/login')
        }

        if(!user) {
            Navigate('/login')
        }
    
    }, [])
    

  return (
    <>
        {children}
    </>
  )
}

export default UserAuth