import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Wallet } from "../models/wallet.model";
import { User } from "../models/user.model";

@Injectable()
export class WalletRepository{
  constructor(@InjectRepository(Wallet) private walletRepository: Repository<Wallet>) {
  }

  async findUser(user: User): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { user: { id: user.id } } });
  }
  async save(wallet: Wallet) {
    return this.walletRepository.save(wallet);
  }
}