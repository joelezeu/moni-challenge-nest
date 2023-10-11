import { HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserRequest } from "../domains/user.request";
import { ChallengeException } from "../exceptions/challenge.exception";
import { User } from "../models/user.model";
import { Wallet } from "../models/wallet.model";
import { WalletRepository } from "../repositories/wallet.repository";
import { ResponseUtil } from "../utils/response.util";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository, private readonly walletRepository: WalletRepository, private responseUtils: ResponseUtil) {
  }

  async createUser(userRequest: UserRequest) {
    let userObj = await this.userRepository.findUserByPhoneNumber(userRequest.phoneNumber);
    if (userObj != null) {
      throw new ChallengeException("User already exist", HttpStatus.EXPECTATION_FAILED);
    }

    let user = new User();
    user.firstName = userRequest.firstName;
    user.lastName = userRequest.lastName;
    user.dob = userRequest.dob;
    user.email = userRequest.email;
    user.phoneNumber = userRequest.phoneNumber;

    user = await this.userRepository.save(user);

    let wallet = new Wallet();
    wallet.user = user;
    wallet.balance = 0;
    wallet.previousBalance = 0;
    wallet.reference = uuidv4();

    wallet = await this.walletRepository.save(wallet);

    return this.responseUtils.getResponse(true, "User Created Successfully, Balance is " + wallet.balance);
  }
}