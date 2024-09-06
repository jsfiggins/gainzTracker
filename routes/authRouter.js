const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

authRouter.post('/signup', async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username })

        if (user) {
            res.status(403)
            return next(new Error('Username already taken'))
        }

        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({ user: savedUser.withoutPassword(), token })

    } catch (err) {
        res.status(500)
        return next(err)
    }
})


authRouter.post('/login', async (req, res, next) => {

    try {

        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            res.status(403)
            return next(new Error('Username or password is incorrect'))
        }
         const passwordCheck = await user.checkPassword(req.body.password)
          if (!passwordCheck) {
            res.status(403)
            return next(new Error('Username or password is incorrect'))
        }

        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)

        return res.status(200).send({ user: user.withoutPassword(), token })

    } catch(err) {
        res.status(500)
        return next(err)
    }
})



module.exports = authRouter 