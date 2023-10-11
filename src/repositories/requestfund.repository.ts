import { RequestFund } from "../models/requestfund.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RequestFundRepository{
  constructor(@InjectRepository(RequestFund) private requestFundRepository: Repository<RequestFund>) {
  }
  async save(requestFund: RequestFund) {
    return this.requestFundRepository.save(requestFund);
  }
}