import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Put,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { HelpersService } from '../helpers/helpers.service';
import { TransactionsDto } from './transactions.dto';
import { CheckPolicies } from '../casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from '../permissions/permissions';
import { PoliciesGuard } from '../casl/policy/policy.guard';

@Controller('transactions')
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly appService: HelpersService,
  ) {}

  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.transactions),
  )
  async createTransaction(
    @Body() transaction: TransactionsDto,
    @Request() req,
    @Response() res,
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.transactionService.createTransaction(transaction),
      res,
      `create transaction for user ${req.user.id} and of id ${req.params.id}`,
    );
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.transactions),
  )
  @Put(':id')
  async editTransaction(
    @Body() transaction: TransactionsDto,
    @Request() req,
    @Response() res,
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.transactionService.modifyTransaction(req.params.id, transaction),
      res,
      `update transaction for user ${req.user.id} and of id ${req.params.id}`,
    );
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.transactions),
  )
  async getTransaction(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.transactionService.getTransaction(req.params.id),
      res,
      `getting transaction for user ${req.user.id} of id ${req.params.id}`,
    );
  }

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
    return this.appService.formatResponse(
      this.logger,
      this.transactionService.findAllForAdmin(
        { from, to, type, customer, id, state },
        { page, rowsPerPage },
      ),
      res,
      `getting all transactions for user ${req.user.id} `,
    );
  }
}
