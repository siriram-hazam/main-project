import prisma from '../db/db.config.js';

export const createCompany = async (req, res) => {
    const { companyName, address, phone_number, email, dpo } = req.body;

    const findEmail = await prisma.company.findUnique({
        where: {
            email: email
        }
    });

    // findEmail ? res.json({ status: 400, message: "CompanyCreate: Email Already Taken!!" }) : null;
    if (findEmail) {
        return res.json({ status: 400, message: "CompanyCreate: Email Already Taken!!" })
    }

    const newCompany = await prisma.company.create({
        data: {
            companyName: companyName,
            address: address,
            phone_number: phone_number,
            email: email,
            dpo: dpo
        }
    });

    return res.json({ status: 200, data: newCompany, message: "Company Data Created!!" });
}

export const updateCompany = async (req, res) => {
    const companyId = req.params.id
    const { companyName, address, phone_number, email, dpo } = req.body;

    await prisma.company.update({
        where: {
            id: Number(companyId)
        },
        data: {
            companyName: companyName,
            address: address,
            phone_number: phone_number,
            email: email,
            dpo: dpo
        }
    })
    return res.json({ status: 200, message: "Company Data Updated!" })
}

export const deleteCompany = async (req, res) => {
    const companyId = req.params.id
    await prisma.company.delete({
        where: {
            id: Number(companyId)
        }
    })

}

export const fetchCompany = async (req, res) => {
    const company = await prisma.company.findMany({})
    return res.json({ status: 200, data: company })
}