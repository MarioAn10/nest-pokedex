import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { catchError, firstValueFrom } from 'rxjs';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';



@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } = await firstValueFrom(
      this.httpService
        .get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    const pokemonsToInsert: CreatePokemonDto[] = []

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = Number(segments[segments.length - 2]);

      pokemonsToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed executed';
  }
}
