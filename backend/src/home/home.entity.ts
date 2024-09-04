import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  street_address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: string;

  @ManyToMany(() => User, (user) => user.homes)
  @JoinTable()
  users: User[];
}
