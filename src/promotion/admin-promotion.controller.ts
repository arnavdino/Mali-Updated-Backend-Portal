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
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { HelpersService } from '../helpers/helpers.service';
import { FilesService } from '../common/file/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PoliciesGuard } from '../casl/policy/policy.guard';
import { CheckPolicies } from '../casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from '../permissions/permissions';

@Controller('admin/promotions')
export class AdminPromotionController {
  private logger = new Logger(AdminPromotionController.name);
  constructor(
    private readonly promotionService: PromotionService,
    private readonly helpersService: HelpersService,
    private readonly fileService: FilesService,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.promotion),
  )
  @Post()
  create(
    @Body() createProductDto: CreatePromotionDto,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.create(req.user, createProductDto),
      res,
      `create  promotion for user ${req.user.id} `,
    );
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.promotion),
  )
  @Post('image/:id')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadItem(@Req() req, @Res() res, @UploadedFile() file) {
    return await this.fileService.fileupload(
      res,
      (name) =>
        this.promotionService.addImageToPromotion(
          req.params.id,
          req.user.id,
          name,
        ),
      file,
    );
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.promotion),
  )
  @Get('product/search')
  findProductForPromotion(
    @Response() res,
    @Request() req,
    @Query('filter') filter: string,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.getProductForPromotions(filter),
      res,
      `get all products for promotion for admin ${req.user.id} `,
    );
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.promotion),
  )
  @Get()
  findAll(
    @Response() res,
    @Request() req,
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: number,
    @Query('page') page: number,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.findAll(filter, { rowsPerPage, page }),
      res,
      `get all promotion for admin ${req.user.id} `,
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: CreatePromotionDto,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.update(id, updateProductDto),
      res,
      `update promotion for user ${req.user.id} of id ${id}`,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.promotionService.remove(id),
      res,
      `deleting promotion for user ${req.user.id} of id ${id}`,
    );
  }
}
