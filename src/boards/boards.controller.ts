import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardsService } from './boards.service';
import { BoardEntity } from './board.entity';

@Controller('boards')
export class BoardsController {
  // 클라이언트 -> 콘트롤러 -> 서비스의 클래스 메소드 호출 
  // boardsService: BoardsService;

  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] { // getAllBoards() 이 함수랑
  //   return this.boardsService.getAllBoards(); // 이 메서드는 이름만같은거
  // }

  @Post()
  @UsePipes(ValidationPipe) // dto 양식에 맞는지 검사
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardsService.getBoardById(id);
  }

  // @Delete('/:id')
  // deleteBoards(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
