import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrdersService) { }

    @UseGuards(AuthGuard("jwt"))
    @Get('/fetch')
    fetchOrders() {
        return this.orderService.getAllOrders();
    }

}
