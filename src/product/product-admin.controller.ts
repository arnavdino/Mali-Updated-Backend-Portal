import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CheckPolicies } from 'src/casl/policy/check-policy.decorator';
import {
  PermissionAction,
  PermissionSubject,
} from '../permissions/permissions';
import { ProductService } from './product.service';
import { HelpersService } from '../helpers/helpers.service';
import { FilesService } from '../common/file/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductStatus } from './entities/product.entity';
import { PoliciesGuard } from '../casl/policy/policy.guard';

@Controller('admin/products')
export class ProductAdminController {
  private logger = new Logger(ProductAdminController.name);
  constructor(
    private readonly productService: ProductService,
    private readonly helpersService: HelpersService,
    private readonly fileService: FilesService,
  ) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  findAllProducts(
    @Response() res,
    @Request() req,
    @Query('filter') filter: string,
    @Query('rowsPerPage') rowsPerPage: number,
    @Query('page') page: number,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.findAll(filter, {
        rowsPerPage: rowsPerPage || 20,
        page: page || 0,
      }),
      res,
      `get all product for admin ${req.user.id} `,
    );
  }

  @Get('categories/search')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  searchCategories(@Query('search') search: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.searchCategories(search),
      res,
      `get categories for user ${req.user.id} of search ${search}`,
    );
  }

  @Get('categories')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.read, PermissionSubject.product),
  )
  findCategories(
    @Response() res,
    @Request() req,
    @Query('filter') filter: string,
    @Query('parentId') parentId: string,
    @Query('include') include: boolean,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.getCategories(filter, parentId, include),
      res,
      `get all categories for admin ${req.user.id} `,
    );
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.product),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.create(req.user, createProductDto),
      res,
      `create  product for user ${req.user.id} `,
    );
  }

  @Post('image/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.create, PermissionSubject.product),
  )
  @UseInterceptors(FileInterceptor('upload'))
  async uploadItem(@Req() req, @Res() res, @UploadedFile() file) {
    return await this.fileService.fileupload(
      res,
      (name) =>
        this.productService.addImageToProduct(req.params.id, req.user.id, name),
      file,
    );
  }

  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.product),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.update(id, updateProductDto),
      res,
      `update product for user ${req.user.id} of id ${id}`,
    );
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.product),
  )
  remove(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.remove(id),
      res,
      `deleting product for user ${req.user.id} of id ${id}`,
    );
  }

  @Put('/delete/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.delete, PermissionSubject.product),
  )
  batchRemove(@Body() ids: string[], @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.removeBatch(ids),
      res,
      `deleting batch products for user ${req.user.id} of ids ${ids}`,
    );
  }

  @Put(':state/batch')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) =>
    ability.can(PermissionAction.update, PermissionSubject.product),
  )
  changeState(@Body() ids: string[], @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.changeStateBatch(
        ids,
        req.params.state as ProductStatus,
      ),
      res,
      `change state batch products for user ${req.user.id} of ids ${ids}`,
    );
  }
}
