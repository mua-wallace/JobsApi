import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/job.module';

@Module({
  imports: [
    JobsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/jobs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
