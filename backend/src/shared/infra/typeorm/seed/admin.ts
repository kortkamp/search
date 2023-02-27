import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UserRole } from '@modules/users/models/IUser';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import crypto from 'crypto';
import 'dotenv/config';

import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const usersRepository = new UsersRepository();

  const adminPassword = crypto.randomBytes(20).toString('hex');

  const admin: ICreateUserDTO = {
    email: 'marcelusmedius@gmail.com',
    name: 'Super Admin',
    active: true,
    role: UserRole.SUPER_ADMIN,
    password: await hash('123456', 8),
  };

  await usersRepository.create(admin);
  await AppDataSource.destroy();
}

create().then(() => console.log('Database seeded successfully!'));
