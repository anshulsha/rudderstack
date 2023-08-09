import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateEventRequestDto } from './create-event.dto';
import { Type } from 'class-transformer';

export class RulesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEventRequestDto)
  events: CreateEventRequestDto[];
}

export class CreateTrackingPlanRequestDto {
  @IsString()
  display_name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  rules: RulesDto;
}
