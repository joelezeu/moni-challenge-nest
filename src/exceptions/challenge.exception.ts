import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseDto } from "../domains/dto/response.dto";

export class ChallengeException extends HttpException {
  constructor(message: string, http: HttpStatus) {
    super(message, http);
  }
  public getCustomResponse(): ResponseDto {
    return new ResponseDto(false, this.message);
  }
}