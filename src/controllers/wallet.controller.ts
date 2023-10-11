import { Body, Controller, Post } from "@nestjs/common";
import { UserRequest } from "../domains/user.request";
import { WalletService } from "../services/wallet.service";
import { FundWalletRequest } from "../domains/fundwallet.request";
import { TransferFundRequest } from "../domains/transferfund.request";

@Controller("/api")
export class WalletController{

  constructor(private walletService: WalletService) {
  }
  @Post("/fund-wallet")
  async fundWallet(@Body() fundWalletRequest: FundWalletRequest) {
    return this.walletService.fundWallet(fundWalletRequest);
  }

  @Post("/transfer-funds")
  async transferFunds(@Body() transferFundRequest: TransferFundRequest) {
    return this.walletService.transferFunds(transferFundRequest);
  }

  @Post("/request-funds")
  async requestFunds(@Body() fundWalletRequest: FundWalletRequest) {
    return this.walletService.requestFunds(fundWalletRequest);
  }
}