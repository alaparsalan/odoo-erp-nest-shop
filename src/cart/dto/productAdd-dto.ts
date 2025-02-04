import { IsNumberString, IsNumber, IsArray } from "class-validator";
export class orderLineDto {

    @IsNumber()
    partnerId: number
    @IsNumber()
    productId: number
    @IsNumber()
    quantity: number

}