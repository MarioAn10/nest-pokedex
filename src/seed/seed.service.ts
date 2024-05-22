import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) { }

  async executeSeed() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1')
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = Number(segments[segments.length - 2]);

      console.log({ name, no });
    });

    return data.results;
  }
}
