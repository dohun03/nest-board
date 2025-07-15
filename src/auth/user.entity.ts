import { BoardEntity } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  //UserEntity의 BoardEntity id를 참조하는 외래키를 가짐
  //@OneToMany(참조할 테이블, 상대 테이블 입장에서 "나를 참조하는 게시글들"을 의미, 같이 조회될지 여부)
  @OneToMany(type => BoardEntity, board => board.user, { eager: true })
  boards: BoardEntity[]
}