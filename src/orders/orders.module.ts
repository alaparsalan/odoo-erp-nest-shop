import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
