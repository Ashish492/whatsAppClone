import { User } from '@api/user'
import Login from '@pages/Login'
import { useEffect, useState } from 'react'
function App() {
  const [isLogin, setIsLogin] = useState(false)
  const fetchAuthUser = async () => {
    try {
      const {
        data: { user },
      } = await User.fetchLoginUser()
      console.log(user)
      setIsLogin(true)
      alert('user login successfully')
    } catch (error) {
      alert('something error to login')
    }
  }
  useEffect(() => {
    fetchAuthUser()
  }, [])
  return <>{isLogin ? <p>thanks for login</p> : <Login />}</>
}
export default App
