import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HelpersService } from 'src/helpers/helpers.service';
import { CreditCardDTO } from './card.dto';
import { UsersService } from './users.service';
import { EditUserDTO } from './edit-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/common/file/files.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UsersService,
    private readonly appService: HelpersService,
    private readonly fileService: FilesService,
  ) {}

  @Get('')
  async getUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.getProfile(req.user.username),
      res,
      `getting profile for ${req.user.id}`,
    );
  }


  @Post('image')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadItem(@Req() req, @Res() res, @UploadedFile() file) {
    return await this.fileService.fileupload(
      res,
      (name) => this.userService.addImage(req.user.id, name),
      file,
    );
  }

  @Put('info/update')
  async updateInfo(
    @Request() req,
    @Response() res,
    @Body() payload: EditUserDTO,
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.updateInfo(req.user.username, payload),
      res,
      `update user ${req.user.id} with fname ${payload.fname} and lname ${payload.lname}`,
    );
  }

  @Delete('delete')
  async deleteUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.deleteUser(req.user.username),
      res,
      `deleting user ${req.user.id} `,
    );
  }

  @Delete('delete/card/:cardId')
  async deleteCard(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.deleteCard(req.user, req.params.cardId),
      res,
      `deleting card for user ${req.user.id}`,
    );
  }
}
