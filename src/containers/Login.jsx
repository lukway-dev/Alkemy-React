import React from 'react'
import LoginForm from '@components/LoginForm'
import LoginImages from '@components/LoginImages'

const Login = () => {
  return (
    <section className="login">
      <LoginImages />
      <LoginForm />
    </section>
  )
}

export default Login