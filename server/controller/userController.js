import prisma from "../db/db.config.js";

import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
    const { username, password, fullname, email, role, company_id, edit_time } = req.body

    const findEmail = await prisma.user_account.findUnique({
        where: { email: email }
    })

    if (findEmail) {
        return res.json({ status: 400, message: "User Create: Email Already Taken!!" })
    }

    const findUser = await prisma.user_account.findUnique({
        where: { username: username }
    })

    if (findUser) {
        return res.json({ status: 400, message: "User Create: Username Already Taken!!" })
    }

    try {
        const passhash = await bcrypt.hash(password, 10)

        const newUser = await prisma.user_account.create({
            data: {
                username: username,
                password: passhash,
                fullname: fullname,
                email: email,
                role: role,
                company_id: company_id,
                edit_time: new Date().toISOString(),
            }
        })
        return res.json({ status: 200, data: newUser, message: "User Data Created!!" })
    } catch (error) {
        console.error(error.message)
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id
    const { password, fullname, role, company_id } = req.body

    // console.log(password)

    // if (password == undefined) {
    //     passhash = password
    // } else {
    //     const passhash = await bcrypt.hash(password, 10)
    // }

    try {
        const passhash = await bcrypt.hash(password, 10)


        await prisma.user_account.update({
            where: {
                id: Number(userId)
            },
            data: {
                password: passhash,
                fullname: fullname,
                role: role,
                company_id: company_id,
                edit_time: new Date().toISOString(),
            }
        })

        return res.json({ status: 200, message: "User Data Updated!!" })
    } catch (error) {
        console.error(error.message)
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id

    try {
        await prisma.user_account.delete({
            where: {
                id: userId
            }
        })

        return res.json({ status: 200, message: "User Data Deleted!!" })
    } catch (error) {
        console.error(error.message)
    }
}

export const fetchUser = async (req, res) => {
    try {
        const user = await prisma.user_account.findMany({})

        return res.json({ status: 200, data: user })
    } catch (error) {
        console.error(error.message)
    }
}

export const fetchUserLogin = async (req, res) => {
    const { username, password, email } = req.body

    try {
        const user = await prisma.user_account.findUnique({
            where: {
                username: username,
                email: email
            },
            select: {
                username: true,
                password: true,
                email: true
            }
        })

        if (user.username != null) {
            const passcheck = await bcrypt.compare(password, user.password)

            if (passcheck) {
                console.log(user.password)
                console.log(password)
                console.log(passcheck)
            }
        }

        return res.json({ status: 200, data: user })

    } catch (error) {
        res.json({ status: 400, message: "User Not Found!" })
        console.error(error.mesage)
    }
}

export const fecthUserAcc = async (req, res) => {
    try {
        const user = await prisma.user_account.findMany({
            select: {
                username: true
            }
        })
        return res.json({ status: 200, data: user })
    } catch (error) {
        console.error(error.message)
    }
}
