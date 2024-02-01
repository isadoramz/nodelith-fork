import { ControllerPath, DeleteRoute, GetRoute, PatchRoute, PostRoute } from '@nodelith/controller'
import { EntityProperties, EntityPropertiesToUpdate } from '@nodelith/context'
import { PetDto, PetDtoConverter } from '@example/api'
import { Pet, PetService } from '@example/domain'

@ControllerPath('/pets')
export class PetController {

  public constructor(
    private readonly petService: PetService
  ) {}

  @GetRoute('/')
  public async getPets(id: string): Promise<PetDto[]> {
    const pets = await this.petService.getPets()
    return PetDtoConverter.convertMany(pets)
  }

  @GetRoute('/:id')
  public async getPetById(id: string): Promise<PetDto> {
    const pet = await this.petService.getPetById(id)
    return PetDtoConverter.convert(pet)
  }

  @DeleteRoute('/:id')
  public async deletePetById(id: string): Promise<void> {
    return this.petService.deletePetById(id)
  }

  @PatchRoute('/:id')
  public async updatePetById(id: string, body: EntityPropertiesToUpdate<Pet>): Promise<PetDto> {
    const pet = await this.petService.updatePetById(id, body)
    return PetDtoConverter.convert(pet)
  }

  @PostRoute('/')
  public async createPet(body: EntityProperties<Pet>): Promise<PetDto> {
    const pet = await this.petService.createPet(body)
    return PetDtoConverter.convert(pet)
  }
}