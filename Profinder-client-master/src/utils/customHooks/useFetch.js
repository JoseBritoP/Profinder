/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

export function useFetch (URL) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(results => {
        setData(results[0])
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error.message)
        setIsLoading(false)
      })

    return function clearData () {
      setData([])
    }
  }, [])

  return { data, isLoading }
}
