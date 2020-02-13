import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ownerUid!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @Column()
  hosts!: string;

  @Column("timestamptz")
  startTime!: string;

  // @CreateDateColumn("timestamptz")
  // created!: string;

  // @UpdateDateColumn("timestamptz")
  // updated!: string;
}
