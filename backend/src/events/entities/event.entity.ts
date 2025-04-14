import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['category', 'title'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('timestamp')
  date!: Date;

  @Column()
  location!: string;

  @Column({ nullable: true })
  category?: string;
}