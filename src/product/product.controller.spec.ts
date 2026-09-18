import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product-user.controller';
import { ProductService } from './product.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: {} },
        { provide: HelpersService, useValue: {} },
        { provide: FilesService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
