import { CreateUserDto, UpdateUserDto, UserDto } from "@/dtos/user";
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
    Put
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import bcrypt from "bcryptjs";
import { User } from "db";

@Controller({
  path: "users",
})
@ApiTags("Users")
export class UserController {
  constructor(
    private readonly userSVC: UserService,
    private configSVC: ConfigService
  ) {}

  private async hashPassword(pwd: string) {
    const saltRounds = this.configSVC.get<number>("PWD_COST_FACTOR");
    try {
      const salt = await bcrypt.genSalt(saltRounds ?? 10);
      return await bcrypt.hash(pwd, Number.parseInt(salt));
    } catch (err) {
      throw err;
    }
  }

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
    const sanitizedInput = {
      ...userInput,
      password: await this.hashPassword(userInput.password),
    };
    return this.userSVC.create(sanitizedInput);
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
    const sanitizedInput = { ...userInput };
    if (sanitizedInput.password)
      sanitizedInput.password = await this.hashPassword(
        sanitizedInput.password
      );
    return this.userSVC.update(id, sanitizedInput);
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
