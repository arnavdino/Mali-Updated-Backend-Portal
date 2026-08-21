import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
  Request,
  Response,
  Query,
  Put,
} from '@nestjs/common';
import { HelpersService } from 'src/helpers/helpers.service';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/permissions/permissions';
import { ManagerService } from './manager.service';
import { WarehouseManagerDTO } from './warehouse-manger.dto';

@Controller('admin/managers')
export class AdminManagerController {
  private readonly logger = new Logger(AdminManagerController.name);
  constructor(
    private readonly managerService: ManagerService,
    private readonly appService: HelpersService,
  ) {}

  @Get('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.manager),
  )
  async getAll(
    @Request() req,
    @Response() res,
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: number,
    @Query('page') page: number,
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.managerService.getAll(filter, { rowsPerPage, page }),
      res,
      `getting managers for ${req.user.id}`,
    );
  }
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.manager),
  )
  async getUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.managerService.findOne(req.params.id),
      res,
      `getting manager ${req.params.id} by ${req.user.id}`,
    );
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.manager),
  )
  async deleteUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.managerService.remove(req.params.id),
      res,
      `deleting manager ${req.params.id} by ${req.user.id} `,
    );
  }
  // @Put('delete/batch')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability) =>
  //   ability.can(PermissionAction.delete, PermissionSubject.manager),
  // )
  // async deleteUsers(
  //   @Request() req,
  //   @Response() res,
  //   @Body() payload: { ids: string[] },
  // ) {
  //   return this.appService.formatResponse(
  //     this.logger,
  //     this.vendorService.deleteVendors(payload),
  //     res,
  //     `deleting managers  by ${req.user.id} `,
  //   );
  // }

  @Put('status/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.manager),
  )
  async updateStatuses(
    @Request() req,
    @Response() res,
    @Body() payload: { ids: string[]; status: string },
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.managerService.changeStates(payload),
      res,
      `change state of  managers  by ${req.user.id} `,
    );
  }

  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.manager),
  )
  async create(@Request() req, @Response() res, @Body() manager: WarehouseManagerDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.managerService.create(manager),
      res,
      `creating manager for ${req.user.id}`,
    );
  }
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.manager),
  )
  async update(@Request() req, @Response() res, @Body() manager: WarehouseManagerDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.managerService.update(req.params.id, manager),
      res,
      `update manager ${req.params.id} by ${req.user.id}`,
    );
  }
}
