import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsInt({ message: `Parameter 'no' must be an integer number` })
    @IsPositive({ message: `Parameter 'no' must be a positive number` })
    @Min(1, { message: `Parameter 'no' must not be less than 1` })
    no: number;

    @IsString()
    @MinLength(1)
    name: string;
}
