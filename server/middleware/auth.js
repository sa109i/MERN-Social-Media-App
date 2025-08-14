import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const verifyToken = async (req, res, next) => {

    const authorization = req.headers.authorization

    if(!authorization) return res.status(403).json({ msg: "user not authorized the requested resource" })

    const token = authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById( id )

    next()
}