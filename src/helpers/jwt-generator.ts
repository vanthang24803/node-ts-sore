import jwt, { JwtPayload } from "jsonwebtoken";

class JwtGenerator {
  generateToken(data: object, secret: string, expires: string) {
    const token = jwt.sign({ data }, secret, {
      expiresIn: expires,
    });
    return token;
  }

  verifyToken(token: string, secret: string) {
    const decoded = jwt.verify(token, secret!) as JwtPayload;
    return decoded;
  }
}

export default JwtGenerator;
