import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/user.model";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { WalletRepository } from "./repositories/wallet.repository";
import { glob } from "glob";
import { join } from 'path';
import { ResponseUtil } from "./utils/response.util";
import { Wallet } from "./models/wallet.model";
import { WalletService } from "./services/wallet.service";
import { WalletController } from "./controllers/wallet.controller";
import { RequestFundRepository } from "./repositories/requestfund.repository";
import { RequestFund } from "./models/requestfund.model";


const controllers = glob.sync(join(__dirname, 'controllers', '**/*.controller.ts'));
const providers = glob.sync(join(__dirname, 'providers', '**/*.service.ts'));


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'shared-user',
      password: 'password',
      database: 'moni',
      synchronize: false,
      logging: true,
      entities: [User, Wallet],
    }),
    TypeOrmModule.forFeature([User, Wallet, RequestFund]),
  ],
  controllers: [AppController, UserController, WalletController],
  providers: [AppService, UserRepository, UserService, WalletRepository, ResponseUtil, WalletService, RequestFundRepository],
})
export class AppModule {}
