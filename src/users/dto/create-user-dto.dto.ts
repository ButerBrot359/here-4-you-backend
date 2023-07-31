import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "user@test.com", description: "User's email"})
    readonly email: string;

    @ApiProperty({example: "123456qwerty", description: "User's password"})
    readonly password: string;
}