import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';
import { PoliciesGuard } from 'src/casl/policy/policy.guard';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from 'src/permissions/permissions';
import { UserDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/authentication/constants';

@Controller('admin/user')
export class AdminUserController {
  private readonly logger = new Logger(AdminUserController.name);
  constructor(
    private readonly userService: UsersService,
    private readonly appService: HelpersService,
    private readonly fileService: FilesService,
  ) {}

  @Get('search')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.vendor),
  )
  async search(@Query('search') search: string, @Response() res, @Request() req) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.search(search),
      res,
      `get users for user ${req.user.id} of search ${search}`,
    );
  }

  @Get('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.user),
  )
  async getUsers(
    @Request() req,
    @Response() res,
    @Query('filter') filter: string,
    @Query('isCustomer') isCustomer: boolean,
    @Query('rowsPerPage') rowsPerPage: number,
    @Query('page') page: number,
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.getUsers(filter, isCustomer, { rowsPerPage, page }),
      res,
      `getting users for ${req.user.id}`,
    );
  }
  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.user),
  )
  async getUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.getUser(req.params.id),
      res,
      `getting user ${req.params.id} by ${req.user.id}`,
    );
  }
  @Get(':id/verify')
  @Public()
  async getUserVerification(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.getUserForVerification(req.params.id),
      res,
      `getting user ${req.params.id} for verification`,
    );
  }

  @Post(':id/verify')
  @Public()
  async verifyUser(@Request() req, @Response() res, @Body() user) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.verifyAdminUser(req.params.id, user),
      res,
      `verifying user ${req.params.id}`,
    );
  }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadItem(@Request() req, @Response() res, @UploadedFile() file) {
    return await this.fileService.fileupload(
      res,
      (name) => this.userService.addImage(req.params.id, name),
      file,
    );
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.user),
  )
  async deleteUser(@Request() req, @Response() res) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.deleteUser(req.params.id),
      res,
      `deleting user ${req.params.id} by ${req.user.id} `,
    );
  }
  @Put('delete/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.user),
  )
  async deleteUsers(
    @Request() req,
    @Response() res,
    @Body() payload: { ids: string[];},
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.deleteUsers(payload),
      res,
      `deleting users  by ${req.user.id} `,
    );
  }

  @Put('status/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.user),
  )
  async updateUsers(
    @Request() req,
    @Response() res,
    @Body() payload: { ids: string[];status:string},
  ) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.changeUsersState(payload),
      res,
      `change state of  users  by ${req.user.id} `,
    );
  }

  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.user),
  )
  async create(@Request() req, @Response() res, @Body() user: UserDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.createUser(user, req.user.id),
      res,
      `getting users for ${req.user.id}`,
    );
  }
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.user),
  )
  async update(@Request() req, @Response() res, @Body() user: UserDTO) {
    return this.appService.formatResponse(
      this.logger,
      this.userService.update(user, req.params.id),
      res,
      `update user ${req.params.id} by ${req.user.id}`,
    );
  }
}
