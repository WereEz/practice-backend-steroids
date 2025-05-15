import { Controller, Post, Body, Get } from '@nestjs/common';

import { AuthService } from 'src/auth/domain/services/AuthService';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserSaveInputDto } from 'src/user/domain/dtos/UserSaveInputDto';
import { TokensDto } from 'src/auth/domain/dtos/TokensDto';



@ApiTags('Авторизация')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) { }

  @Post('register')
  //Добавить @ApiOperation @ApiBody
  @ApiOkResponse({
    description: 'User successfully registered',
    type: TokensDto,
  })
  register(@Body() dto: UserSaveInputDto) {
    return this.authService.registration(dto);
  }

  //   @Post('login')
  //   @ApiOkResponse({
  //     description: 'User successfully logged in',
  //     type: TokensDto,
  //   })
  //   login(@Body() authDto: AuthDto): Promise<TokensDto> {
  //     return this.authService.login(authDto);
  //   }

  //   @Post('refresh')
  //   @ApiOkResponse({
  //     description: 'Token successfully refreshed',
  //     type: TokensDto,
  //   })
  //   refresh(@Body('refreshToken') refreshToken: string): Promise<TokensDto> {
  //     return this.authService.refresh(refreshToken);
  //   }
}
