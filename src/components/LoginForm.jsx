import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import Context from '@context/Context'
import Logo from '@images/logo.svg'

const LoginForm = () => {
  const { contextData, setContextData } = useContext(Context)
  const [errors, setErrors] = useState([])

  //Formik Validate
  const validate = values => {
    const errors = {}
    if (!values.email) {
      setErrors({
        ...errors,
        email: 'Por favor, complete este campo'
      })
    }

    if (!values.password) {
      setErrors({
        ...errors,
        password: 'Por favor, complete este campo'
      })
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      axios.post('https://challenge-react.alkemy.org/', {
        email: values.email,
        password: values.password
      })
        .then(res => {
          // Save token
          setContextData({
            ...contextData,
            token: res.data.token
          })
          localStorage.setItem('token', res.data.token)
        })
        .catch(() => {
          // Set alerts
          setErrors({
            email: 'El email o la contraseña no son validos',
            password: 'El email o la contraseña no son validos'
          })
        })
    },
  })

  return (
    <section className="login-container">
      <div className="login-card">
        <img className="login-card__logo" src={Logo} alt="Superteam Logo" />
        <h1 className="login-card__title">Iniciar Sesión</h1>
        <h4 className="login-card__caption">Es hora de crear tu <br />equipo con tus personajes favoritos</h4>

        <form className="login-card__form" onSubmit={formik.handleSubmit}>
          <label className="login-card__form-label" htmlFor="email">Email</label>
          <div className="login-card__form-item">
            <input
              className="login-card__form-input"
              id="email"
              name="email"
              type="email"
              maxLength="70"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <i className="login-card__form-icon fas fa-envelope"/>
            {
              errors.email
                ? <span className="login-card__form-alert">* {errors.email}</span>
                : null
            }
          </div>

          <label className="login-card__form-label" htmlFor="password">Contraseña</label>
          <div className="login-card__form-item">
            <input
              className="login-card__form-input"
              id="password"
              name="password"
              type="password"
              maxLength="30"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <i className="login-card__form-icon fas fa-key"/>
            {
              errors.password
                ? <span className="login-card__form-alert">* {errors.password}</span>
                : null
            }
          </div>

          <button className="login-card__form-button" type="submit">Iniciar Sesión</button>
        </form>

        {contextData.token
          ? <Redirect to="/"/>
          : null}
      </div>
    </section>
  )
}

export default LoginForm