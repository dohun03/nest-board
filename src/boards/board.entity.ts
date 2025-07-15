import { UserEntity } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

// 클래스 기반 DB 테이블 엔티티.
@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  
  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  //BoardEntity가 UserEntity의 id를 참조하는 외래키를 가짐
  //@ManyToOne(참조할 테이블, 상대 테이블 입장에서 "나를 참조하는 게시글들"을 의미, ..)
  @ManyToOne(type => UserEntity, user => user.boards, { eager:false })
  user: UserEntity;
}