import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class HttpAdapter {
  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService.get<T>(url, { headers: headers }).pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          throw new BadRequestException(error);
        }),
      ),
    );
  }
}
