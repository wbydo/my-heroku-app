import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base';

@Entity('accesses')
export class Access extends Base {
  @Column({ name: 'token' })
  token: string;

  @OneToMany(() => Access, (access) => access.parent)
  children?: Array<Access>;

  @ManyToOne(() => Access, (access) => access.children)
  @JoinColumn({ name: 'access_id' })
  parent?: Access;

  constructor(token: string, id?: number) {
    super(id);
    this.token = token;
  }
}
