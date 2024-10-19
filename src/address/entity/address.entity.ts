import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'zipCode', nullable: false })
  zipCode: string;

  @Column({ name: 'number', nullable: false })
  number: number;

  @Column({ name: 'complement', nullable: false })
  complement: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;
}
