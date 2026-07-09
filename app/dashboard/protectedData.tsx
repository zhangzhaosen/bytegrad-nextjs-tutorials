'use client'
import { useEffect, useState } from "react"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function ProtectedData() {

  const [data, setData] = useState('')

  const { getAccessTokenRaw, getAccessToken } = useKindeBrowserClient()

  console.log('getAccessToken', getAccessToken())

  const raw = getAccessTokenRaw()

  useEffect(() => {

    if (!raw) {
      return
    }

    console.log('getAccessTokenRaw', raw)
    const getData = async () => {
      const res = await fetch('http://localhost:3001/api/protected', {
        headers: {
          'Authorization': 'Bearer ' + raw
        }
      })
      const data = await res.json()
      console.log(data)
      setData(data.message)
    }
    getData()
  }, [raw])

  return (
    <div>
      <h1>Protected Data: {data}</h1>
    </div>
  )
}