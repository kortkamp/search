export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CRAWLER = 'crawler',
}

interface IUser {
  id: string;

  name: string;

  role: UserRole;

  email: string;

  password: string;

  active: boolean;

  created_at: Date;

  updated_at: Date;
}

export { IUser };
