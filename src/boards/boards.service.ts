import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { v1 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() // 어디서든 사용 ㄱㄴ
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  // private boards: Board[] = []; // this.boards = Board 객체 형식만 받겠다.(복수) = []

  getAllBoards(): Promise<BoardEntity[]> { // 여러개 받으니까 배열로 리턴
    return this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> { 
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    const found = await this.boardRepository.findOneBy({id:id});

    if (!found) {
      throw new NotFoundException(`${id}에 대한 게시글를 찾을 수 없습니다.`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`${id}에 대한 게시글를 찾을 수 없습니다.`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
    const board = await this.getBoardById(id);
  
    if (!board) {
      throw new Error(`Board with ID ${id} not found`);
    }
    
    board.status = status;  

    await this.boardRepository.save(board);

    return board;
  }
}
