import prisma from "../db/db.config.js";

function getRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 9000000);
}

export const createCompany = async (req, res) => {
  const { companyName, address, phone_number, email, dpo } = req.body;

  const findEmail = await prisma.company.findUnique({
    where: {
      email: email,
    },
  });

  const randomNumber = getRandomSixDigitNumber();

  // findEmail ? res.json({ status: 400, message: "CompanyCreate: Email Already Taken!!" }) : null;
  if (findEmail) {
    return res.json({
      status: 400,
      message: "CompanyCreate: Email Already Taken!!",
    });
  }

  try {
    const newCompany = await prisma.company.create({
      data: {
        id: randomNumber,
        companyName: companyName,
        address: address,
        phone_number: phone_number,
        email: email,
        dpo: dpo,
      },
    });

    return res.json({
      status: 200,
      data: newCompany,
      message: "Company Data Created!!",
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  const { companyName, address, phone_number, email, dpo } = req.body;

  try {
    await prisma.company.update({
      where: {
        id: Number(companyId),
      },
      data: {
        companyName: companyName,
        address: address,
        phone_number: phone_number,
        email: email,
        dpo: dpo,
      },
    });
    return res.json({ status: 200, message: "Company Data Updated!" });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    await prisma.company.delete({
      where: {
        id: Number(companyId),
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchCompany = async (req, res) => {
  try {
    const company = await prisma.company.findMany({});
    return res.json({ status: 200, data: company });
  } catch (error) {
    console.error(error.message);
  }
};
