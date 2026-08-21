import {
  Controller,
  Get,
  Param,
  Response,
  Request,
  Logger,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';

@Controller('products')
export class ProductController {
  private logger = new Logger(ProductController.name);
  constructor(
    private readonly productService: ProductService,
    private readonly helpersService: HelpersService,
    private readonly fileService: FilesService,
  ) {}

  @Get()
  findUserProducts(
    @Response() res,
    @Request() req,
    @Query('filter') filter: string,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.findAllForUser(filter),
      res,
      `get all product for user ${req.user.id} `,
    );
  }

  @Get('main')
  findMain(@Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.findMain(),
      res,
      `get main products for user ${req.user.id} `,
    );
  }
  @Get('search')
  search(
    @Query('search') search: string,
    @Query('category') category: string,
    @Response() res,
    @Request() req,
  ) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.search(search, category),
      res,
      `get product of category ${category} for user ${req.user.id} of search ${search}`,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Response() res, @Request() req) {
    return this.helpersService.formatResponse(
      this.logger,
      this.productService.findOne(id),
      res,
      `get product for user ${req.user.id} of id ${id}`,
    );
  }
}
