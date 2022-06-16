import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

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

export { User };
