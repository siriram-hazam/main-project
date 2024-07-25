import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token == null)
      return (
        res.clearCookie("token"), res.clearCookie("user"), res.sendStatus(403)
      );

    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return (
          res.clearCookie("token"), res.clearCookie("user"), res.sendStatus(403)
        );
      // console.log(user);
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error.message);
  }
};
