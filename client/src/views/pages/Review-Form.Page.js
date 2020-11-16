// react
import React, { Fragment, useState } from 'react'

//hooks
import { useSelector } from 'react-redux'
import { useHttp } from '../hooks/useHttp.Hook'
import { useMessage } from '../hooks/useMessage.Hook'

// components
import PageTitle from '../components/Page-Title'

const ReviewFormPage = ({ history }) => {
  const { name, _id } = useSelector((state) => state.location)
  const { request, loading } = useHttp()
  const message = useMessage()
  const [form, setForm] = useState({
    author: '',
    rating: '1',
    reviewText: '',
  })
  
  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onClickHandler = () => {
    request(
      `/api/locations/${_id}/reviews`, 
      'POST', 
      form, 
      {
        'auth-token': JSON.parse(localStorage.getItem('auth')).token,
      }
    )
    .then(() => {
      message('Отзыв добавлен')
      history.go(-1)
    })
    .catch((err) => message(err.message || 'Что-то пошло не так, попробуйте позже'))
  }

  return (
    <Fragment>
      <PageTitle title={`Оставить отзыв заведению "${name}"`} />

      <section className='review-form'>
        <div className='container'>
          <div id='review-form__alert' role='alert' className='alert alert-danger d-none'>
            Пожалуйста заполните все поля
          </div>

          <div id='addReview'>
            <div className='form-group row'>
              <label className='col-xs-12 col-md-2 col-form-label'>Ваше имя</label>
              <div className='col-xs-12 col-md-10'>
                <input name='author' type='text' className='form-control' onChange={onChangeHandler} />
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-xs-12 col-md-2 col-form-label'>Рейтинг</label>
              <div className='col-xs-12 col-md-3'>
                <select name='rating' className='custom-select' onChange={onChangeHandler}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-xs-12 col-md-2 col-form-label'>Отзыв</label>
              <div className='col-xs-12 col-md-10'>
                <textarea
                  rows='5'
                  name='reviewText'
                  className='form-control'
                  onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>
            <button className='btn btn-primary ml-auto d-block' onClick={onClickHandler} style={{maxWidth: '110px'}} disabled={loading ? true : false}>
              Отправить
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default ReviewFormPage
