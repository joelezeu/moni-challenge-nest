import { Injectable } from "@nestjs/common";
import { ResponseDto } from "../domains/dto/response.dto";

@Injectable()
export class ResponseUtil{

  async getResponse(
    success: boolean,
    message: string,
    data?: any,
  ): Promise<ResponseDto> {
    return new ResponseDto(success, message, data);
  }
}