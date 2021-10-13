const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const User = require("../models/User")

const createUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'The user already exists'
            })
        }

        user = new User(req.body)

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        await user.save()
    
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: 'false',
            msg: 'An error has occured'
        })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: `The user doesn't exist`
            })
        }

        const passwordMatched = bcrypt.compareSync(password, user.password)

        if(!passwordMatched){
            return res.status(400).json({
                ok: false,
                msg: `Incorrect password`
            })
        }

        const token = await generateJWT(user.id, user.name)

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(err)
        res.status(500).json({
            ok: 'false',
            msg: 'An error has occured'
        })
    }

}

const renewToken = async (req, res) => {
    const { uid, name } = req

    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}

module.exports  = {
    createUser,
    loginUser,
    renewToken
}