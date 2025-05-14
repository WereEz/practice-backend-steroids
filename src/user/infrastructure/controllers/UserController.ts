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
    SerializeOptions,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { UserSaveInputDto } from 'src/user/domain/dtos/UserSaveInputDto';
import { UserSearchDto } from 'src/user/domain/dtos/UserSearchDto';
import { UpdateUserDto } from 'src/user/domain/dtos/UpdateUserDto';
import { IUserService } from 'src/user/domain/interfaces/IUserServise';
import { UserService } from 'src/user/domain/services/UserService';
import { UserSchema } from 'src/user/domain/dtos/UserSchema';

@ApiTags('Users')
@Controller('/users')
export class UserController {
    constructor(
        @Inject(IUserService)
        private readonly userService: UserService,
    ) { }

    @ApiOperation({ summary: 'Get all users with optional filter' })
    @ApiOkResponse({
        type: [UserSchema],
    })
    @SerializeOptions({ type: UserSchema, excludeExtraneousValues: true })
    @Get()
    async list(@Query() query: UserSearchDto) {
        return this.userService.getFilteredUsers(query);
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({
        type: UserSchema,
    })
    @SerializeOptions({ type: UserSchema, excludeExtraneousValues: true })
    @Get('/:id')
    async get(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserByIdOrPanic(id);
    }

    @ApiOperation({ summary: 'Create new user' })
    @Post()
    @ApiOkResponse({
        type: [UserSchema],
    })
    @SerializeOptions({ type: UserSchema, excludeExtraneousValues: true })
    async create(@Body() dto: UserSaveInputDto) {
        return this.userService.createUserOrPanic(dto);
    }

    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOkResponse({
        description: 'Returns updated user',
        type: UserSchema,
    })
    @SerializeOptions({ type: UserSchema, excludeExtraneousValues: true })
    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.userService.updateUserOrPanic(id, dto);
    }

    @ApiOperation({ summary: 'Soft delete user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.softDeleteUserById(id);
    }
}
