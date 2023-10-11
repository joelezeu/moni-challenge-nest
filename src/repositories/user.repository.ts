import { Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository{
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }
  async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.userRepository.findOneBy({ phoneNumber });
  }
  async save(user: User) {
    return this.userRepository.save(user);
  }
}