import {
  Controller,
  Get,
  Logger,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { HelpersService } from 'src/helpers/helpers.service';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/permissions/permissions';
import { ProductService } from 'src/product/product.service';
import { AnalyticsService } from './analytics.service';

@Controller('admin/analytics')
export class AnalyticsController {
  private logger = new Logger(AnalyticsController.name);
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly helpersService: HelpersService,
  ) {}

  @Get('featured')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  findAllProducts(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.analyticsService.getFeaturedProducts(),
      res,
      `get feature products sales`,
    );
  }
  @Get('transactions')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  findLatestTransactions(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.analyticsService.getLatestTransactiosn(),
      res,
      `get transactions products sales`,
    );
  }

  @Get('active')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  findActiveProducts(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.analyticsService.getActiveProducts(),
      res,
      `get active products sales`,
    );
  }

  @Get('revenueSummary')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  findRevenueSummary(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.analyticsService.getRevenueSummary(),
      res,
      `get revenue summary products sales`,
    );
  }

  @Get('last12')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  getLast12(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.analyticsService.getLast12Months(),
      res,
      `get last 12  products sales`,
    );
  }
}
