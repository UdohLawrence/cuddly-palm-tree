import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
  {
    id: 1,
    name: 'Unyime John',
    email: 'john@gmail.com',
    role: 'INTERN',
  },
  {
    id: 2,
    name: 'Ekomobong Lawrence',
    email: 'ekomobong001@gmail.com',
    role: 'ADMIN',
  },
  {
    id: 3,
    name: 'Kokoette Augustine',
    email: 'kokoette@gmail.com',
    role: 'ENGINEER',
  },
  {
    id: 4,
    name: 'Nyaknno Raphael',
    email: 'nyaknno@gmail.com',
    role: 'ENGINEER',
  },
  {
    id: 5,
    name: 'Inibehe Susanna',
    email: 'ekaette@gmail.com',
    role: 'INTERN',
  },
];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  createUSer(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const highestID = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: highestID[0].id + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    }){
      this.users = this.users.map(user => {
        if(user.id === id){
          return {...user, ...updatedUser}
        }
        return user
      })

      return this.findOne(id)
    }
    delete(id:number){
      const removedUser = this.users.filter(user => user.id !== id)

      return removedUser
    }
}
