import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.UserRepository.create({ username, password: hashedPassword });

    try {
      await this.UserRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 username 입니다.');
      } else {
        throw new ConflictException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialsDto;
    const found = await this.UserRepository.findOneBy({ username });

    if (found && (await bcrypt.compare(password, found.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { username } // 중요정보x
      const accessToken = await this.jwtService.sign(payload);
      
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
