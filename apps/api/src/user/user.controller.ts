import { FindOneQuery } from "@/types";
import { UserService } from "@/user/user.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "db";
import { CreateUserDto, UpdateUserDto, UserDto } from "./user.dto";

@ApiBearerAuth("defaultBearerAuth")
@Controller({
  path: "users",
})
@ApiTags("Users")
export class UserController {
  constructor(private readonly userSVC: UserService) {}

  @Get("")
  @ApiOkResponse({
    description: "Retrieve a user",
    type: UserDto,
  })
  async find(
    @Param("id", ParseIntPipe) id?: number,
    @Param("email") email?: string
  ): Promise<User | null> {
    if (!id && !email) return null;

    let query: FindOneQuery = {} as FindOneQuery;
    if (id) {
      query = { id };
    } else if (email) {
      query = { email };
    }

    const user = await this.userSVC.find(query);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  @Post()
  @ApiOkResponse({
    description: "Create a user",
    type: UserDto,
  })
  async create(@Body() userInput: CreateUserDto): Promise<User> {
    return this.userSVC.create(userInput);
  }

  @Put(":id")
  @ApiOkResponse({
    description: "Update a user",
    type: UserDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() userInput: UpdateUserDto
  ): Promise<User | null> {
    return this.userSVC.update(id, userInput);
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "Delete a user",
    type: UserDto,
  })
  delete(@Param("id", ParseIntPipe) id: number): Promise<User | null> {
    return this.userSVC.delete(id);
  }
}
