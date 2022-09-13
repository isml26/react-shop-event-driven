import jwt from "jsonwebtoken";

export function setJwt(user: any, req: any) {
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      confirmed:user.confirmed
    },
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJwt,
  };
}
