import { Body, Controller, Post } from "@nestjs/common";
import { UserRequest } from "../domains/user.request";
import { UserService } from "../services/user.service";

@Controller("/api")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post("/create")
  async createUser(@Body() userRequest: UserRequest) {
    return this.userService.createUser(userRequest);
  }

}