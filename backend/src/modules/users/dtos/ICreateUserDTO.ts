import { UserRole } from '../models/IUser';

interface ICreateUserDTO {
  email: string;
  name: string;
  role: UserRole;
  password?: string;
  active?: boolean;
  tenant_id?: string;
}

export { ICreateUserDTO };
