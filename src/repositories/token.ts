export default interface ITokenService {
  generateToken: (token: string, id: string) => Promise<unknown>;
  refreshToken: (token: string) => Promise<object>;
}
