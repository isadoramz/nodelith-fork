import { Pet } from '@example/domain';
import { PetDto } from './pet-dto';

export class PetDtoConverter {
  public static convert(pet: Pet): PetDto {
    return {
      id: pet.id,
      name: pet.name,
      age: pet.age,
    };
  }

  public static convertMany(pets: Array<Pet>): Array<PetDto> {
    return pets.map(pet => PetDtoConverter.convert(pet));
  }
}