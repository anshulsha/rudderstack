import { IsString, IsJSON } from 'class-validator';

export class CreateEventRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsJSON()
  rules: any;
}
