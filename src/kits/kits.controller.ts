import { Body, Controller, Get, Logger, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { HelpersService } from 'src/helpers/helpers.service';
import { PermissionAction, PermissionSubject } from 'src/permissions/permissions';
import { CreateKitDto } from './dto/create-kit.dto';
import { KitsService } from './kits.service';

@Controller('admin/kits')
export class KitsController {
  private readonly logger = new Logger(KitsController.name);

  constructor(private readonly kitsService: KitsService, private readonly helpers: HelpersService) {}

  @Get('product/:productId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(PermissionAction.read, PermissionSubject.product))
  findByProductId(@Param('productId') productId: string, @Response() res) {
    return this.helpers.formatResponse(
      this.logger,
      this.kitsService.findByProductId(productId),
      res,
      'get kit by product',
    );
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(PermissionAction.create, PermissionSubject.product))
  create(@Body() dto: CreateKitDto, @Request() req, @Response() res) {
    return this.helpers.formatResponse(this.logger, this.kitsService.create(req.user, dto), res, 'create kit');
  }
}
