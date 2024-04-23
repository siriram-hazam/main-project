import prisma from "../db/db.config.js";

export const createUser = async (req, res) => {
    const { username, password, fullname, email, role, company_id, edit_time } = req.body

    const findEmail = await prisma.user_account.findUnique({
        where: { email: email }
    })

    if (findEmail) {
        return res.json({ status: 400, message: "User Create: Email Already Taken!!" })
    }

    const newUser = await prisma.user_account.create({
        data: {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            role: role,
            company_id: company_id,
            edit_time: new Date().toISOString(),
        }
    })
    return res.json({ status: 200, data: newUser, message: "User Data Created!!" })
}

export const updateUser = async (req, res) => {
    const userId = req.params.id
    const { password, fullname, email, role, company_id, edit_time } = req.body

    await prisma.user_account.update({
        where: {
            id: Number(userId)
        },
        data: {
            password: password,
            fullname: fullname,
            role: role,
            company_id: company_id,
            edit_time: new Date().toISOString(),
        }
    })

    return res.json({ status: 200, message: "User Data Updated!!" })
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id

    await prisma.user_account.delete({
        where: {
            id: userId
        }
    })

    return res.json({ status: 200, message: "User Data Deleted!!" })
}

export const fecthUserAcc = async (req, res) => {
    const user = await prisma.user_account.findMany({
        select: {
            username: true
        }
    })
    return res.json({ status: 200, data: user })
}

export const fetchUser = async (req, res) => {
    const user = await prisma.user_account.findMany({})

    return res.json({ status: 200, data: user })
}

export const fetchUserLogin = async (req, res) => {
    const { username } = req.body

    const user = await prisma.user_account.findMany({
        where: {
            username: username,
        }
    })

    return res.json({ status: 200, data: user })
}