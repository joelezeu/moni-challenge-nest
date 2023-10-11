import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RequestfundEnum } from "./enums/requestfund.enum";

@Entity({ name: "request_fund" })
export class RequestFund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipient: string;
  @Column()
  amount: number;

  @Column({ type: "enum", enum: RequestfundEnum, default: RequestfundEnum.PENDING })
  status: RequestfundEnum;
}