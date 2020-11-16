// libs
import React, { useState, useEffect } from 'react'

// hooks
import { useSelector } from 'react-redux'
import { useHttp } from '../hooks/useHttp.Hook'
import { useMessage } from '../hooks/useMessage.Hook'

const AuthPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const { loading, request, error, clearError } = useHttp()
  const login = useSelector((state) => state.login)
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error])

  const registerHandler = async () => {
    try {
      await request('/api/auth/register', 'POST', { ...form })
      setForm({
        email: '',
        password: ''
      })
      message('Аккаунт успешно создан')
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      login(data.token)
      message('Вы успешно вошли в аккаунт')
    } catch (e) {}
  }

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section className='auth text-center'>
      <div className='auth__form'>
        <img className='mb-4' src='/compass.svg' alt='Compass' />
        <h1 className='h3 mb-3 font-weight-normal'>Compass</h1>

        <input
          type='email'
          className='form-control'
          name='email'
          placeholder='Email'
          autoComplete='off'
          value={form.email}
          onChange={onChangeHandler}
        />

        <input
          type='password'
          className='form-control'
          name='password'
          placeholder='Пароль'
          autoComplete='off'
          value={form.password}
          onChange={onChangeHandler}
        />

        {/* <div className='checkbox mb-3 font-weight-normal'>
          <label className='d-flex align-items-center justify-content-center'>
            <input type='checkbox' value='remember-me' className='mr-1' />
            Запомнить меня
          </label>
        </div> */}

        <div className='buttons-wrapper mt-4'>
          <button
            className='btn btn-lg btn-primary btn-block font-weight-light m-0'
            disabled={loading}
            onClick={loginHandler}
          >
            Войти
          </button>

          <button
            className='btn btn-lg btn-danger btn-block font-weight-light m-0'
            disabled={loading}
            onClick={registerHandler}
          >
            Регистрация
          </button>
        </div>

        <p className='mt-5 mb-3 text-muted'>&copy; Потапенко Павел 2020</p>
      </div>
    </section>
  )
}

export default AuthPage
