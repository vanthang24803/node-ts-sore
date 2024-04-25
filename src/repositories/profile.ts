export default interface IProfileService {
  getProfile: (token: string) => Promise<object>;
}
