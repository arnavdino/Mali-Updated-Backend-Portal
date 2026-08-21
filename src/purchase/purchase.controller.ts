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
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/create-purchase.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { Roles } from 'src/authentication/role.decorator';

@Controller('purchases')
export class PurchaseController {
  private logger = new Logger(PurchaseController.name);
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly helpersService: HelpersService,
  ) {}

  @Post()
  @Roles('User')
  create(
    @Body() createPurchaseDto: PurchaseDto,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.create(createPurchaseDto, req.user.id),
      res,
      `create purchase for user ${req.user.id}`,
    );
  }

  @Get()
  findAll(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.findAll(req.user.id),
      res,
      `getting all purchases for user ${req.user.id} `,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.findOne(id),
      res,
      `get purchase for user ${req.user.id} of id ${id}`,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: PurchaseDto,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.update(id, updatePurchaseDto),
      res,
      `update purchase for user ${req.user.id} of id ${id}`,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.remove(id),
      res,
      `delete purchase for user ${req.user.id} of id ${id}`,
    );
  }
}
