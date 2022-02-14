import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class jobDTO {
  @ApiProperty({
    type: String,
    description: 'The title of the job position',
    default: '',
  })
  @IsString()
  readonly title: string;
  @IsInt()
  readonly salary: number;
}
