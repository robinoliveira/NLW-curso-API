import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Survey } from "./Survey";

@Entity("surveys_users")
class SurveysUsers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "survey_id" })
  survey: Survey;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  // essse construtor esta a ser usado para verificar se o
  //o usuario a ser adicionado é um usuario novo
  //ou se estamos a fazer alguma modificação no usuario
  //ja criado
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveysUsers };
