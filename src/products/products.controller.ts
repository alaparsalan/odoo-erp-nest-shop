import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @Get('/fetch')
    fetchProducts(@Query('limit') limit: number, @Query('offset') offset: number) {
        return this.productService.getProductsData(limit, offset);
    }

}
