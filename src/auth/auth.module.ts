import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234', // secret text 및 토큰 생성
      signOptions: {
        expiresIn: 60 * 60 // 유효시간: 1시간 (초)
      }
    }),
    TypeOrmModule.forFeature([UserEntity])
  ], // 다른 모듈의 의존성 주입(@Injectable) 클래스 사용하려면 등록. (가져오기)
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 의존성 주입 클래스 등록
  exports: [PassportModule, JwtStrategy] // 다른 서비스에 의존성 주입 사용하려면 등록 (내보내기)
})
export class AuthModule {}
