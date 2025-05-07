'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './components/Header'

 function Home() {
  const router = useRouter()
  

  useEffect(() => {
    router.push('/users')
  }, [router])

  return (
    <>
    <Header className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px] flex justify-center items-center'/>
    
    </>
  ) 
  
}
  
export default  Home