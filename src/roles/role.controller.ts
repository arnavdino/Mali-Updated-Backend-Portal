import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { HelpersService } from '../helpers/helpers.service';
import { RoleDto } from './role.dto';
import { CheckPolicies } from '../casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from '../permissions/permissions';
import { PoliciesGuard } from '../casl/policy/policy.guard';
import { Logging } from 'src/decorators/logging';

@Controller('roles')
export class RoleController {
  private readonly logger = new Logger(RoleController.name);
  constructor(
    private readonly roleService: RoleService,
    private readonly appService: HelpersService,
  ) {}

  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.role),
  )
  async createRole(@Body() role: RoleDto, @Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.roleService.createRole(role),
      res,
      `create role for user ${req.user.id} and of id ${req.params.id}`,
    );
  }
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.role),
  )
  @Put(':id')
  async editRole(@Body() role: RoleDto, @Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.roleService.modifyRole(req.params.id, role),
      res,
      `update role for user ${req.user.id} and of id ${req.params.id}`,
    );
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.role),
  )
  async deleteRole(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.roleService.deleteRole(req.params.id),
      res,
      `delete role for user ${req.user.id} and of id ${req.params.id}`,
    );
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.role),
  )
  async getRole(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.roleService.getRole(req.params.id),
      res,
      `getting role for user ${req.user.id} of id ${req.params.id}`,
    );
  }

  @Get('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.role),
  )
  async getRoles(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.roleService.getRoles(),
      res,
      `getting roles for user ${req.user.id}`,
    );
  }
}
