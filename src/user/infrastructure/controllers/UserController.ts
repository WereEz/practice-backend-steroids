import {
    Controller,
    Get,
    Post,
    Put,
    Inject,
    Delete,
    Param,
    Body,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';
import { GetUsersDto } from 'src/user/domain/dtos/get-users.dto';
import { UpdateUserDto } from 'src/user/domain/dtos/update-user.dto';
import { IUserService, UserServiceToken } from 'src/user/domain/interfaces/IUserServise';

@ApiTags('Users')
@Controller('/users')
export class UserController {
    constructor(
        @Inject(UserServiceToken)
        private readonly userService: IUserService,
    ) { }

    @ApiOperation({ summary: 'Get all users with optional filter' })
    @Get()
    async list(@Query() query: GetUsersDto) {
        return this.userService.getFilteredUsers(query);
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @Get('/:id')
    async get(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'Create new user' })
    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }

    @ApiOperation({ summary: 'Soft delete user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.softDeleteUserById(id);
    }
}
