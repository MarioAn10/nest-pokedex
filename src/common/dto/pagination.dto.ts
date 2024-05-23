import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;

    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    order?: string;
}