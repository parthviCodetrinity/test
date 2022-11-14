import md5 from 'md5'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { registerdata } from './redux/action/action'
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
const signup = (props) => {
    const handleInput = (e) => {
        const { name, value } = e.target
        setError({ ...error, [name]: '' })
        setRegister({ ...registerInput, [name]: value })
    }
    const initialState = {
        id: null,
        name: '',
        email: '',
        password: '',
        token: '',
        created_at: ''
    }
    const [showPassword, setShowPassword] = useState(false)

    const [registerInput, setRegister] = useState(initialState);
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',

    });
    const messagess = {
        allFiels: 'Please Fill Up the Form',
        name: 'Please Fill The UserName Field',
        email: 'Please Fill The Email Field',
        password: 'Please Fill The Password Field',

    }
    const variable = md5(registerInput.password);
    // const loginData = useSelector((state) => state.register.register)
    const registerSubmit = (e) => {
        e.preventDefault()
        const registerdata = {
            id: uuid(),
            name: registerInput.name.trim(),
            email: registerInput.email.trim(),
            password: variable.trim(),
            role_as: 0,
            token: uuid(),
            created_at: new Date()
        }
        let name = ''
        let email = ''
        let password = ''

        if (registerInput.name.trim() === '' || registerInput.email.trim() === '' || registerInput.password.trim() === '') {
            if (registerInput.name.trim() === '') {
                name = messagess.name
            }
            if (registerInput.email.trim() === '') {
                email = messagess.email
            }
            if (registerInput.password.trim() === '') {
                password = messagess.password
            }

            setError({
                name: name,
                email: email,
                password: password,

            })
        }
        else {
            setRegister(initialState)
        }
        props.register(registerdata)

    }
    

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee;" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px;" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" name='name' onChange={handleInput} className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" name="email" onChange={handleInput} className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" name="password" onChange={handleInput} className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                </div>
                                            </div> */}

                                            <div className="col-auto">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <div className="input-group mb-2">
                                                    <input type={showPassword ? 'text' : 'password'} id="loginPassword" name='password' className="form-control"
                                                        onChange={handleInput} />
                                                    <div className="input-group-append">
                                                        <div className="input-css">
                                                            <label
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                htmlFor="toggle">{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={registerSubmit}>Register</button>
                                            </div>
                                          
                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state) => ({
    data: state.register,
})

const mapDispatchToProps = (dispatch) => ({
    register: (initialData) => dispatch(registerdata(initialData))
})


export default connect(mapStateToProps, mapDispatchToProps)(signup)