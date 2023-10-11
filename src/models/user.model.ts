import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({name: "first_name"})
  firstName: string;
  @Column({name: "last_name"})
  lastName: string;
  @Column({name: "email"})
  email: string;
  @Column({name: "address"})
  address: string;
  @Column({name: "dob"})
  dob: string;
  @Column({ name:"phone_number", unique: true })
  phoneNumber: string;
}