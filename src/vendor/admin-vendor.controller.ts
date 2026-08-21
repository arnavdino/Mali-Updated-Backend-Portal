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
import { VendorService } from './vendor.service';
import { VendorDTO } from './vendor.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/permissions/permissions';

@Controller('admin/vendors')
export class AdminVendorController {
  private readonly logger = new Logger(AdminVendorController.name);
  constructor(
    private readonly vendorService: VendorService,
    private readonly appService: HelpersService,
  ) {}

  @Get('search')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.vendor),
  )
  async search(@Query('search') search: string, @Response() res, @Request() req) {
    return this.appService.formatResponse(
      this.logger,
      this.vendorService.search(search),
      res,
      `get vendors for user ${req.user.id} of search ${search}`,
    );
  }

  @Get('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.vendor),
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
      this.vendorService.getVendors(filter, { rowsPerPage, page }),
      res,
      `getting vendors for ${req.user.id}`,
    );
  }
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.vendor),
  )
  async getUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.vendorService.findOne(req.params.id),
      res,
      `getting vendor ${req.params.id} by ${req.user.id}`,
    );
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.vendor),
  )
  async deleteUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.vendorService.remove(req.params.id),
      res,
      `deleting vendor ${req.params.id} by ${req.user.id} `,
    );
  }
  // @Put('delete/batch')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability) =>
  //   ability.can(PermissionAction.delete, PermissionSubject.vendor),
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
  //     `deleting vendors  by ${req.user.id} `,
  //   );
  // }

  @Put('status/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.vendor),
  )
  async updateUsers(
    @Request() req,
    @Response() res,
    @Body() payload: { ids: string[]; status: string },
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.vendorService.changeVendorsState(payload),
      res,
      `change state of  vendors  by ${req.user.id} `,
    );
  }

  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.vendor),
  )
  async create(@Request() req, @Response() res, @Body() vendor: VendorDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.vendorService.createVendor(vendor),
      res,
      `creating vendor for ${req.user.id}`,
    );
  }
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.vendor),
  )
  async update(@Request() req, @Response() res, @Body() vendor: VendorDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.vendorService.update(req.params.id, vendor),
      res,
      `update vendor ${req.params.id} by ${req.user.id}`,
    );
  }
}
