import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BenchmarkInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();

    console.log('Endpoint: ', request.url);
    console.log('Method: ', request.method);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Execution time: ${Date.now() - now}ms`)));
  }
}
