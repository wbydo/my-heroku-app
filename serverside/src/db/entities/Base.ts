import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updeted_at' })
  readonly updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleated_at' })
  readonly deletedAt?: Date;

  constructor(id?: number) {
    if (id) this.id = id;
  }
}
