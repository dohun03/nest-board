import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { v1 as uuid } from 'uuid';

@Injectable() // 어디서든 사용 ㄱㄴ
export class BoardsService {
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

  getBoardById(id: string): Board | undefined {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
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
