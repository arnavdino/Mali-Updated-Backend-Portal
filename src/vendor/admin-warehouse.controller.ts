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
import { WarehouseDTO } from './warehouse.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/permissions/permissions';
import { WarehouseService } from './warehouse.service';

@Controller('admin/warehouses')
export class AdminWarehouseController {
  private readonly logger = new Logger(AdminWarehouseController.name);
  constructor(
    private readonly warehouseService: WarehouseService,
    private readonly appService: HelpersService,
  ) {}

  @Get('search')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.warehouse),
  )
  async search(@Query('search') search: string, @Response() res, @Request() req) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.search(search),
      res,
      `get warehouses for user ${req.user.id} of search ${search}`,
    );
  }

  @Get('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.warehouse),
  )
  async getVendors(
    @Request() req,
    @Response() res,
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: number,
    @Query('page') page: number,
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.getAll(filter, { rowsPerPage, page }),
      res,
      `getting warehouses for ${req.user.id}`,
    );
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.warehouse),
  )
  async getUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.findOne(req.params.id),
      res,
      `getting warehouse ${req.params.id} by ${req.user.id}`,
    );
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.warehouse),
  )
  async deleteUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.remove(req.params.id),
      res,
      `deleting warehouse ${req.params.id} by ${req.user.id} `,
    );
  }
  // @Put('delete/batch')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability) =>
  //   ability.can(PermissionAction.delete, PermissionSubject.warehouse),
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
  //     `deleting warehouses  by ${req.user.id} `,
  //   );
  // }

  @Put('status/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.warehouse),
  )
  async updateUsers(
    @Request() req,
    @Response() res,
    @Body() payload: { ids: string[]; status: string },
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.changeStates(payload),
      res,
      `change state of  warehouses  by ${req.user.id} `,
    );
  }

  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.warehouse),
  )
  async create(@Request() req, @Response() res, @Body() warehouse: WarehouseDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.create(warehouse),
      res,
      `creating warehouse for ${req.user.id}`,
    );
  }
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.warehouse),
  )
  async update(@Request() req, @Response() res, @Body() warehouse: WarehouseDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.warehouseService.update(req.params.id, warehouse),
      res,
      `update warehouse ${req.params.id} by ${req.user.id}`,
    );
  }
}
