import { IsNumberString } from "class-validator";
export class partnerIdDto {

    @IsNumberString()
    partnerId: string
}