import { Login, Register } from '@/models/auth';

interface IAuthService {
  register: (data: Register) => Promise<object>;
  login: (data: Login) => Promise<object>;
}

export default IAuthService;
