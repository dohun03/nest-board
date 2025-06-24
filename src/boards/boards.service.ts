import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { v1 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() // 어디서든 사용 ㄱㄴ
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<Board>,
  ) {}

  private boards: Board[] = []; // this.boards = Board 객체 형식만 받겠다.(복수) = []

  getAllBoards(): Board[] {  // 리턴 형식
    return this.boards; // return 123; --> 에러뜸
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`${id}에 대한 게시글를 찾을 수 없습니다.`);
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id); // 클래스 내부의 함수는 this로 접근해야한다.

    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
  
    if (!board) {
      throw new Error(`Board with ID ${id} not found`);
    }
  
    board.status = status;
    return board;
  }
}
