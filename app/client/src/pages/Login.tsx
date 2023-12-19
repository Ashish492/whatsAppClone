import {} from '@api'
import { User } from '@api/user'
import { FC } from 'react'
import { FcGoogle } from 'react-icons/fc'
type Props = {}
const Login: FC<Props> = _props => {
  const fetchAuthUser = async () => {
    try {
      const {
        data: { user },
      } = await User.fetchLoginUser()
      console.log(user)
      alert('user login successfully')
    } catch (error) {
      alert('something error to login')
    }
  }
  const handleLogin = async () => {
    let timer: number | null = null
    const googleLoginURL = `${import.meta.env.VITE_API_URL}/auth/login/google`
    const newWindow = window.open(
      googleLoginURL,
      '_self',
      'width=500,height=600',
    )
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser()
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }
  return (
    <>
      <div className="flex bg-panel-header-background justify-center items-center min-h-screen min-w-full gap-7 flex-col">
        <div className="flex items-center justify-center  gap-4">
          <img src="/assets/whatsapp.gif" height={300} width={300} />
          <span className="text-7xl text-white ">Whatsapp</span>
        </div>
        <button
          className="bg-search-input-container-background flex justify-center items-center gap-7 rounded-lg p-4 "
          onClick={handleLogin}
        >
          <FcGoogle className="text-4xl" />
          <span className="text-2xl text-white">Login with google</span>
        </button>
      </div>
    </>
  )
}
export default Login
