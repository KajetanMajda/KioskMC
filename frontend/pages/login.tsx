import '../app/Style/login.css'
import LoginComp from '../app/Components/Login/login'
import NavbarAdmin from "../app/Components/NavbarAdmin/navbarAdmin";

export default function Login() {
  return (
    <>
      <style>
        {`
              body {
                margin: 0;
              }
            `}
      </style>
      <div className='home-container-login'>
        <div className="navbar-container-login-up">
          <NavbarAdmin />
        </div>
        <div className="middle-container">
          <LoginComp />
        </div>
      </div>
    </>
  )
}
