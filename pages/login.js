import md5 from 'md5'
import React, { useEffect, useState } from 'react'
import { connect} from 'react-redux'
import Swal from 'sweetalert2'
import { loginAuthentication } from './redux/action/action'
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import FacebookLogin from 'react-facebook-login';
import { useRouter } from 'next/router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { firebaseApp } from "../firebase-config"

const login = (props) => {
  const initialmessage = {
    emailData: '',
    passData: '',
  }
  const router = useRouter()
  const messagess = {
    emptyemail: "Please Enter The Email",
    emptypass: "Please Enter The Password",
    notExistEmail: "User Does Not Existed....",
    wrongPassWord: "Please Enter Correct Password..."
  }
  
  const intialSigInData = {
    emailData: '',
    passData: ''
  }

  const [showPassword, setShowPassword] = useState(false)
  const [signInData, setSignIndata] = useState(intialSigInData)
  const [errors, setErr] = useState(initialmessage);
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setErr({ ...errors, [name]: "" })
    setSignIndata({ ...signInData, [name]: value })

  }
  const submithandle = (e) => {
    let blankemail = "";
    let blankpass = "";
    if (signInData.emailData == '' || signInData.passData == '') {
      if (signInData.emailData == '') {
        blankemail = messagess.emptyemail
      }
      if (signInData.passData == '') {
        blankpass = messagess.emptypass
      }
      setErr({
        emailData: blankemail,
        passData: blankpass
      })

      return false;
    }

    var loginAuthData = {
      emailData: signInData.emailData,
      passData: md5(signInData.passData)
    }
    props.loginData(loginAuthData)
  }

  var token = []
  const responseFacebook = (response) => {
    token = localStorage.setItem("token", response.accessToken)
    router.push('/')
  }
  const componentClicked = (data) => {
    console.log(data);
  }

  //
  const firebaseAuth = getAuth(firebaseApp)
  const provider = new GoogleAuthProvider()

  const signIn = async () =>{
    const response = await signInWithPopup(firebaseAuth,provider)
    console.log(response)

  }
  useEffect(() => {

    console.log(props.data.register.logindata)
    if (props.data.register.logindata !== undefined) {
      if (props.data.register.logindata.status == 1) {
        Swal.fire({
          icon: 'success',
          text: props.data.register.logindata.message,
          timer: 2000
        })
      }
      if (props.data.register.logindata.status == 0) {
        Swal.fire({
          icon: 'error',
          text: props.data.register.logindata.message,
          timer: 2000
        })
      }
    }
  }, [props.data.register.logindata])

  return (
    <section className="vh-100" style={{ backgroundColor: "gray" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign in</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typeEmailX-2">Email</label><br />
                  <input type="email" id="typeEmailX-2" name="emailData" onChange={changeHandle} value={signInData.emailData} className="form-control form-control-lg" />
                  <small style={{ color: "red" }}><b>{errors.emailData}</b></small>

                </div>

                <div className="col-auto">
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="input-group mb-2">
                    <input type={showPassword ? 'text' : 'password'} id="loginPassword" name='passData' className="form-control"
                      onChange={changeHandle} />
                    <div className="input-group-append">
                      <div className="input-css">
                        <label
                          onClick={() => setShowPassword(!showPassword)}
                          htmlFor="toggle">{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <small style={{ color: "red" }}><b>{errors.passData}</b></small>


                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                </div>

                <button className="btn btn-primary btn-lg btn-block w-100" onClick={submithandle} type="submit">Login</button>

                <hr className="my-4" />

                {/* <button className="btn btn-lg btn-block btn-danger w-100" style={{ backgroundColor: "#dd4b39" }}
                  type="submit" onClick={signOutButtonNode}>  <BsGoogle /> Sign in with google</button>  */}
                {/* {showLoginButton ?
                  <GoogleLogin
                    className="btn btn-lg btn-block btn-danger w-100"
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                  /> : null}

                {showLogoutButton ?
                  <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                  >
                  </GoogleLogout> : null
                } */}
                <a onClick={signIn}>sign With Google</a>
                <br />
                <FacebookLogin
                  appId="656346599175677"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook} />
              </div>
            </div>
          </div>
        </div>
      </div >
    </section>
  )
}


const mapStateToProps = (state) => ({
  data: state,
})

const mapDispatchToProps = (dispatch) => ({
  loginData: (initialData) => dispatch(loginAuthentication(initialData))
})


export default connect(mapStateToProps, mapDispatchToProps)(login)