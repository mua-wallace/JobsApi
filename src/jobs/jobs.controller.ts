import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
  Render,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { jobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';
import { ValidationPipe } from '../pipes/validation.pipe';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';
// import { JobData } from '../decorators/jobdata.decorator';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @Render('jobs/index')
  @CacheKey('allJobs')
  @CacheTTL(15)
  @Get()
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }
  // root() {
  //   return this.jobsService
  //     .findAll()
  //     .then((result) => (result ? { jobs: result } : { jobs: [] }));
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @CacheKey('allJobs')
  @CacheTTL(30)
  find(@Param('id') id: string): Promise<Job> {
    return this.jobsService
      .find(id)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
      });
  }
  @Post()
  @ApiCreatedResponse({
    description: 'The resource has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body(ValidationPipe) job: jobDTO): Promise<Job> {
    return this.jobsService.create(job);
  }
  @Put(':id')
  @ApiOkResponse({
    description: 'The resource  has been successfully updated',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() job: jobDTO): Promise<Job> {
    return this.jobsService.update(id, job);
  }
  @Delete(':id')
  @ApiOkResponse({
    description: 'The resource has been successfully removed',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  delete(@Param('id') id: string): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
