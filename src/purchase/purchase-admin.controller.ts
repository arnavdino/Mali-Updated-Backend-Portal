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
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/create-purchase.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/permissions/permissions';

@Controller('admin/transactions')
export class PurchaseAdminController {
  private logger = new Logger(PurchaseAdminController.name);
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly helpersService: HelpersService,
  ) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.transactions),
  )
  findAll(
    @Response() res,
    @Request() req,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('type') type: string,
    @Query('customer') customer: string,
    @Query('id') id: string,
    @Query('state') state: string,
    @Query('page') page: number,
    @Query('rowsPerPage') rowsPerPage: number,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.findAllForAdmin(
        { from, to, type, customer, id, state },
        { page, rowsPerPage },
      ),
      res,
      `getting all purchases for user ${req.user.id} `,
    );
  }

  @Get('categories')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.transactions),
  )
  ginfCategories(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.findCategories(),
      res,
      `get purchase categories for user ${req.user.id} `,
    );
  }
  @Get('statuses')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.transactions),
  )
  getStatuses(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.findStatuses(),
      res,
      `get purchase statuses for user ${req.user.id} `,
    );
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.transactions),
  )
  findOne(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.findOne(id),
      res,
      `get purchase for user ${req.user.id} of id ${id}`,
    );
  }
  @Put(':id/initiate')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(
      PermissionAction.refund_initiate,
      PermissionSubject.transactions,
    ),
  )
  initiateRefund(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.initiateRefuned(id),
      res,
      `initiate refund for  purchase for user ${req.user.id} of id ${id}`,
    );
  }

  @Put(':id/decline')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(
      PermissionAction.refund_confirming,
      PermissionSubject.transactions,
    ),
  )
  declineRefund(
    @Param('id') id: string,
    @Response() res,
    @Request() req,
    @Body() body: { notes: string },
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.declineRefund(id, body.notes),
      res,
      `decline refund for  purchase for user ${req.user.id} of id ${id}`,
    );
  }

  @Put(':id/confirm')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(
      PermissionAction.refund_confirming,
      PermissionSubject.transactions,
    ),
  )
  confirmRefund(
    @Param('id') id: string,
    @Response() res,
    @Request() req,
    @Body() body: { notes: string },
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.confrimRefund(id, body.notes),
      res,
      `confirm refund for  purchase for user ${req.user.id} of id ${id}`,
    );
  }

  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.transactions),
  )
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.transactions),
  )
  remove(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.purchaseService.remove(id),
      res,
      `delete purchase for user ${req.user.id} of id ${id}`,
    );
  }
}
