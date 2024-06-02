'use client'
import { useRouter } from 'next/navigation';
import Registration from '@/components/auth/registration';

export default function Home() {
  // const isAuth = useSelector((state) => state.auth.isAuth)
  // const router = useRouter()
  // useEffect(() => {
  //   if(isAuth) router.push("/resumes")
  // },[isAuth])
  return (
    <>
      <Registration/>
    </>
  )
}
