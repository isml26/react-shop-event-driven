import jwt from "jsonwebtoken";

export function setJwt(user: any, req: any) {
  // const userJwt = jwt.sign(
  //   {
  //     id: user.id,
  //     email: user.email,
  //     confirmed:user.confirmed
  //   },
  //   process.env.JWT_KEY!
  // );
  
  // Signing a token with 1 hour of expiration:
  const userJwt = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + (60*60),
      data: {
        id: user.id,
        email: user.email,
        confirmed: user.confirmed,
      },
    },
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJwt,
  };
}
