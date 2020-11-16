const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/users')
const { validationResult } = require('express-validator')

module.exports.register = async (req, res) => {
  try {
    //Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации',
      })
    }

    const { email, password } = req.body

    const condidate = await User.findOne({ email })
    if (condidate) {
      res
        .status(400)
        .json({ message: 'Пользователь с таким email уже существует' })
      return
    }

    const hashedPassword = bcrypt.hashSync(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })
  } catch (e) {
    res.status(500).json('Что-то пошло не так, попробуйте еще раз')
  }
}

module.exports.login = async (req, res) => {
  try {
    //Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации',
      })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' })
    }

    const validPass = await bcrypt.compare(password, user.password)
    if (!validPass) {
      return res.status(400).json({ message: 'Неверный email или пароль' })
    }

    const token = jwt.sign({ _id: user._id }, config.get('JWT-Secret'))

    res
      .header('auth-token', token)
      .json({ token, user_id: user._id, auth: true })
  } catch (e) {
    res.status(500).json('Что-то пошло не так, попробуйте еще раз')
  }
}

module.exports.validate = async (req, res) => {
  try {
    const token = req.headers['auth-token']
    if (!token) {
      res.status(401).json({ auth: false })
      return
    }

    jwt.verify(token, config.get('JWT-Secret'))

    res.json({ auth: true })
  } catch (e) {
    res.status(401).json({ message: e.message, auth: false })
  }
}
