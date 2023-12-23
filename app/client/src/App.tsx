import {} from '@api/user'
import { useAppDispatch, useAppSelector } from '@hook/useStore'
import Login from '@pages/Login'
import {
  authUserSelector,
  checkLogin,
  isLoginSelector,
} from '@store/features/auth'
import { useEffect } from 'react'
function App() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(isLoginSelector)
  const currentUser = useAppSelector(authUserSelector)
  useEffect(() => {
    dispatch(checkLogin())
  }, [])
  return (
    <>
      {isLogin ? (
        <p>
          hello {currentUser?.name}
          <img src={currentUser?.profilePic} alt="userProfile" />
        </p>
      ) : (
        <Login />
      )}
    </>
  )
}
export default App
