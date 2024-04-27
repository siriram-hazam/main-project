import prisma from '../db/db.config.js'

export const createDepartment = async (req, res) => {
    const { departmentName, company } = req.body

    try {
        const newDepartment = await prisma.department.create({
            data: {
                departmentName: departmentName,
                company_id: Number(company),
            }
        })

        return res.json({ companyData: companyData, data: newDepartment, message: 'Created Department!!' })

    } catch (error) {
        console.error(error.message)
    }

}

export const updateDepartment = async (req, res) => {
    const { id } = req.params.id
    const { department, company } = req.body

    try {
        await prisma.department.update({
            where: {
                id: Number(id),
            },
            data: {
                department: department,
                company_id: Number(company),
            }
        })

        return res.json({ status: 200, message: 'Updated Department!!' })

    } catch (error) {
        console.error(error.message)
    }

}

export const deleteDepartment = async (req, res) => {
    const id = req.params.id

    try {
        await prisma.department.delete({
            where: {
                id: Number(id),
            }
        })

        return res.json({ status: 200, message: 'Deleted Department!!' })

    } catch (error) {
        console.error(error.message)
    }

}

export const fetchDepartment = async (req, res) => {
    const { cid } = req.query //รับค่า Company ID ของ User ปัจจุบันเข้ามา http://localhost:3000/api/department?cid=1 method:delete

    try {
        const allDepartment = await prisma.department.findMany({
            where: {
                company_id: Number(cid),
            }
        })

        return res.json({ status: 200, data: allDepartment })

    } catch (error) {
        console.error(error.message)
    }

}
