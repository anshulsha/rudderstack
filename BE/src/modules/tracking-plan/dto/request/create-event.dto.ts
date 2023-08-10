import { IsString, IsJSON } from 'class-validator';

export class CreateEventRequestDto {
  @IsString()
  display_name: string;

  @IsString()
  description: string;

  @IsJSON()
  rules: any;
}
