import React from 'react'
import Template from '../components/core/Auth/Template'
import Image from '../assets/Images/login.webp'

const Login = () => {
  return (
    <div>
        <Template heading={"Welcome Back"} description1={"Build skills for today, tomorrow, and, beyond."}
            description2={"Education to future-proof your career." }
            image={Image}
            formType={"login"}
        />
    </div>
  )
}

export default Login