import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthenticationModule } from './authentication/authentication.module';

import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ AuthenticationModule, CartModule, OrdersModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
