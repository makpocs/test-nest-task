import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  personId: string;

  @Column({ type: 'float', default: 0 })
  balance: number;

  @Column({ type: 'float' })
  dailyWithdrawalLimit: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'int' })
  accountType: number;

  @CreateDateColumn()
  createDate: Date;
}
