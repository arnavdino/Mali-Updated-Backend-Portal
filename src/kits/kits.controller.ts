import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { HelpersService } from 'src/helpers/helpers.service';
import { PermissionAction, PermissionSubject } from 'src/permissions/permissions';
import { CreateKitDto } from './dto/create-kit.dto';
import { KitsService } from './kits.service';

@Controller('admin/kits')
export class KitsController {
  constructor(private readonly kitsService: KitsService, private readonly helpers: HelpersService) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(PermissionAction.create, PermissionSubject.product))
  create(@Body() dto: CreateKitDto, @Request() req, @Response() res) {
    return this.helpers.formatResponse(console as any, this.kitsService.create(req.user, dto), res, 'create kit');
  }
}
