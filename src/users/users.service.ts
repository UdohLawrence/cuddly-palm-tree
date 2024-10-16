import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
      const rolesArray = this.users.filter((user) => user.role === role);

      if(rolesArray.length === 0) throw new NotFoundException('User Role Not Found');

      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if(!user) throw new NotFoundException("User Not Found")

    return user;
  }

  createUSer(createUserDto: CreateUserDto) {
    const highestID = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: highestID[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(
    id: number,
    updateUserDto: UpdateUserDto){
      this.users = this.users.map(user => {
        if(user.id === id){
          return {...user, ...updateUserDto}
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
