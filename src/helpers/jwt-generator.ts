import jwt, { JwtPayload } from "jsonwebtoken";

class JwtGenerator {
  static generateToken(data: object, secret: string, expires: string) {
    const token = jwt.sign({ data }, secret, {
      expiresIn: expires,
    });
    return token;
  }

  static verifyToken(token: string, secret: string) {
    const decoded = jwt.verify(token, secret!) as JwtPayload;
    return decoded;
  }
}

export default JwtGenerator;
