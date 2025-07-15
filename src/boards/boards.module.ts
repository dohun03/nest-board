import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardEntity } from './board.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    AuthModule
  ],  // 다른 모듈의 의존성 주입(@Injectable) 클래스 사용하려면 등록. (가져오기)
  controllers: [BoardsController],
  providers: [BoardsService], // 의존성 주입 클래스 등록
  exports: [] // 다른 서비스에 의존성 주입 사용하려면 등록 (내보내기)
})
export class BoardsModule {}
