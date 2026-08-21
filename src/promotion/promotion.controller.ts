import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Response,
  Request,
  UseInterceptors,
  Req,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('promotions')
export class PromotionController {
  private logger = new Logger(PromotionController.name);
  constructor(
    private readonly promotionService: PromotionService,
    private readonly helpersService: HelpersService,
    private readonly fileService: FilesService,
  ) {}

  @Get()
  findAll(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.findAllForUser(),
      res,
      `get all promotion for user ${req.user.id} `,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.findOne(id),
      res,
      `get promotion for user ${req.user.id} of id ${id}`,
    );
  }
}
