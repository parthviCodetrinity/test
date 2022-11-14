import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const index = () => {
  const [token,setToken] = useState(null)
  useEffect(() => {
  token = localStorage.getItem("token")
  setToken(token)
  },[])
  const logoutClick = () =>{
    localStorage.clear()
    setToken(null)
  }
  return (
    <div>
      {token == null ?
        <Link href="/login">Login</Link>
         :
         <button onClick={logoutClick}> Logout</button>
      }
    </div>
  )
}

export default index