import { FC } from 'react'
type Props = {}
const Login: FC<Props> = _props => {
  return (
    <>
      <div className="grid bg-panel-header-background place-items-center min-h-screen min-w-full ">
        <div className="flex justify-start h-[30vh] gap-4">
          <img src="/assets/whatsapp.gif" />
          <span className="text-7xl text-white self-center">Whatsapp</span>
        </div>
        <button className="rounded"> login with google</button>
      </div>
    </>
  )
}
export default Login
