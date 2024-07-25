import prisma from "../db/db.config.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function getRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const createUser = async (req, res) => {
  const { username, password, fullname, email, role, company_id, photo_path } =
    req.body;

  // const companyData = await prisma.company.findFirst({
  //     where: {
  //         companyName: companyName,
  //     },
  //     select: {
  //         id: true,
  //         companyName: true,
  //     }
  // })

  // console.log(companyData.id)

  const findEmail = await prisma.user_account.findUnique({
    where: { email: email },
  });

  if (findEmail) {
    return res.json({
      status: 400,
      message: "User Create: Email Already Taken!!",
    });
  }

  const findUser = await prisma.user_account.findUnique({
    where: { username: username },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "User Create: Username Already Taken!!",
    });
  }

  const randomId = getRandomSixDigitNumber();

  try {
    const passhash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user_account.create({
      data: {
        id: randomId,
        username: username.toLowerCase(),
        password: passhash,
        fullname: fullname,
        email: email,
        role: role,
        company_id: company_id,
        edit_time: new Date().toISOString(),
        photo_path: photo_path,
      },
    });
    return res.json({
      status: 200,
      data: newUser,
      message: "User Data Created!!",
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { password, fullname, role, company_id } = req.body;

  // console.log(password)

  // if (password == undefined) {
  //     passhash = password
  // } else {
  //     const passhash = await bcrypt.hash(password, 10)
  // }

  try {
    const passhash = await bcrypt.hash(password, 10);

    await prisma.user_account.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: passhash,
        fullname: fullname,
        role: role,
        company_id: company_id,
        edit_time: new Date().toISOString(),
      },
    });

    return res.json({ status: 200, message: "User Data Updated!!" });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await prisma.user_account.delete({
      where: {
        id: userId,
      },
    });

    return res.json({ status: 200, message: "User Data Deleted!!" });
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchUserLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user_account.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        company_id: true,
      },
    });

    if (user.username != null) {
      const passcheck = await bcrypt.compare(password, user.password);

      if (passcheck) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            role: user.role,
            company_id: user.company_id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // console.log(token);

        delete user.password;
        delete user.role;

        return res
          .cookie("token", token, {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            maxAge: new Date(Date.now() + 1 * 60 * 60 * 1000), //cookie delete after 1 hour
          })
          .cookie("user", user, {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            maxAge: new Date(Date.now() + 1 * 60 * 60 * 1000), //cookie delete after 1 hour
          })
          .json({ status: 200, user });
      }

      return res.json({ status: 400, message: "Password Incorrect!" });
    }
  } catch (error) {
    res.json({ status: 400, message: "User Not Found!" });
    // console.error(error);
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await prisma.user_account.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        company_relation: true,
      },
    });

    return res.json({ status: 200, users: user });
  } catch (error) {
    console.error(error.message);
  }
};

export const fecthUserAcc = async (req, res) => {
  try {
    const user = await prisma.user_account.findMany({
      select: {
        username: true,
      },
    });
    return res.json({ status: 200, data: user });
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchUser = async (req, res) => {
  try {
    // const user = req.cookies.user;
    // const token = req.cookies.token;
    // console.log(req.user);
    res.json(req.user);
  } catch (error) {
    console.error(error.message);
  }
};
