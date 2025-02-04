import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationModule } from 'src/authentication/authentication.module';
@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule { }
