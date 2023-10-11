import { HttpStatus, Injectable } from "@nestjs/common";
import { FundWalletRequest } from "../domains/fundwallet.request";
import { WalletRepository } from "../repositories/wallet.repository";
import { UserRepository } from "../repositories/user.repository";
import { ChallengeException } from "../exceptions/challenge.exception";
import { Wallet } from "../models/wallet.model";
import { ResponseUtil } from "../utils/response.util";
import { TransferFundRequest } from "../domains/transferfund.request";
import { RequestFund } from "../models/requestfund.model";
import { RequestfundEnum } from "../models/enums/requestfund.enum";
import { RequestFundRepository } from "../repositories/requestfund.repository";

@Injectable()
export class WalletService {

  constructor(private readonly walletRepository: WalletRepository, private readonly userRepository: UserRepository, private responseUtils: ResponseUtil,

              private requestFundRepository: RequestFundRepository) {
  }

  async fundWallet(fundWalletRequest: FundWalletRequest) {
    const phoneNumber = fundWalletRequest.phoneNumber;

    const user = await this.userRepository.findUserByPhoneNumber(phoneNumber);
    if (user == null) {
      throw new ChallengeException("User not found", HttpStatus.NOT_FOUND);
    }

    const isPayStackFundingSuccessful = true;

    if (isPayStackFundingSuccessful) {
      const walletUSer = await this.walletRepository.findUser(user);
      if (walletUSer == null) {
        throw new ChallengeException("Wallet not found", HttpStatus.NOT_FOUND);
      }

      const wallet = new Wallet();
      wallet.previousBalance = wallet.balance;
      wallet.balance = fundWalletRequest.amount;
      wallet.user = user;
      wallet.reference = fundWalletRequest.reference;

      await this.walletRepository.save(wallet);

      return this.responseUtils.getResponse(true, "Wallet Funding Successful");

    }
    throw new ChallengeException("Payment failed. Please try again", HttpStatus.EXPECTATION_FAILED);
  }

  async transferFunds(transferFundRequest: TransferFundRequest) {
    const amount = transferFundRequest.amount;

    const creditUser = await this.userRepository.findUserByPhoneNumber(transferFundRequest.creditPhoneNumber);

    if (creditUser == null) {
      throw new ChallengeException("Credit Account not found", HttpStatus.NOT_FOUND);
    }

    const deditUser = await this.userRepository.findUserByPhoneNumber(transferFundRequest.debitPhoneNumber);

    if (deditUser == null) {
      throw new ChallengeException("Debit Account not found", HttpStatus.NOT_FOUND);
    }

    const creditWallet = await this.walletRepository.findUser(creditUser);
    if (creditWallet == null) {
      throw new ChallengeException("Credit Wallet not found", HttpStatus.NOT_FOUND);
    }

    const deditWallet = await this.walletRepository.findUser(deditUser);
    if (deditWallet == null) {
      throw new ChallengeException("Debit Wallet not found", HttpStatus.NOT_FOUND);
    }

    if (amount > deditWallet.balance) {
      throw new ChallengeException("Insufficient Balance", HttpStatus.EXPECTATION_FAILED);
    }

    const creditBalance = deditWallet.balance - amount;

    deditWallet.previousBalance = deditWallet.balance;
    deditWallet.balance = creditBalance;

    this.walletRepository.save(deditWallet);

    const debitBalance = creditWallet.balance + amount;

    creditWallet.previousBalance = creditWallet.balance;
    creditWallet.balance = debitBalance;

    this.walletRepository.save(deditWallet);

    //Log Transactions.

    return this.responseUtils.getResponse(true, "fund transfer successful");

  }

  async requestFunds(fundWalletRequest: FundWalletRequest) {
    const user = await this.userRepository.findUserByPhoneNumber(fundWalletRequest.phoneNumber);
    if (user == null) {
      throw new ChallengeException("Credit Account not found", HttpStatus.NOT_FOUND);
    }

    const wallet = await this.walletRepository.findUser(user);
    if (wallet == null) {
      throw new ChallengeException("Credit Wallet not found", HttpStatus.NOT_FOUND);
    }

    const requestFund = new RequestFund();
    requestFund.recipient = fundWalletRequest.phoneNumber;
    requestFund.amount = fundWalletRequest.amount;
    requestFund.status = RequestfundEnum.PENDING;

    this.requestFundRepository.save(requestFund);

    const paymentLink = "http://link_to_share.com";

    return this.responseUtils.getResponse(true, "Kindly use this link to credit your account " + paymentLink);
  }
}