import { BadRequestException, PipeTransform } from "@nestjs/common"
import { BoardStatus } from "../board.model";

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [ // 클래스 내부의 변수(상태) = 속성(프로퍼티).
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  //즉, 프로퍼티와 메서드는 (대부분) this로만 접근 가능.

  transform(value: any) {
    value = value.toUpperCase(); // value는 함수 내부의 '지역변수'

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} 는 옵션에 없습니다.`) // throw는 함수 실행을 멈춤.
    }

    return value;
  }

  private isStatusValid(status: any) { // 클래스 내부 동작 함수는 메서드.
    const index = this.StatusOptions.indexOf(status);
    return index !== -1; // true or false 반환.
  }
}