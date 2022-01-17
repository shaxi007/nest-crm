import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teacher_: string;
}
