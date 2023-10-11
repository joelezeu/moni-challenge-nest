import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity({name: "wallet"})
export class Wallet{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  balance: number;
  @Column({ unique: true })
  reference: string;
  @Column({name: "previous_balance"})
  previousBalance: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}