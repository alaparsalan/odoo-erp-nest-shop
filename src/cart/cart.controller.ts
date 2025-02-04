import { Controller, Get, Post, Param, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { partnerIdDto } from './dto/cart-dto'
import { orderLineDto } from './dto/productAdd-dto'
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService) { }

    @UseGuards(AuthGuard("jwt"))
    @Get('/products')
    productsFetch() {
        return this.cartService.fetchProducts();
    }
    @UseGuards(AuthGuard("jwt"))
    @Get('/:partnerId')
    getCart(@Param() params: partnerIdDto) {
        let id = params.partnerId;
        return this.cartService.fetchCart(id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post('/addtocart')
    addToCart(@Body() productData: orderLineDto) {
        return this.cartService.addToCart(productData);
    }
    @UseGuards(AuthGuard("jwt"))
    @Put('/updatecart')
    updateCart(@Body() updateData) {
        let { cartId, qty } = updateData;
        return this.cartService.updateItemInCart(cartId, qty);
    }
    @UseGuards(AuthGuard("jwt"))
    @Delete('/removeitem')
    removeCart(@Body() removeCartId) {
        let { cartId } = removeCartId;
        return this.cartService.removeItemFromCart(cartId);
    }

}
