import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.id)
  account: Account;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn()
  transactionDate: Date;
}
