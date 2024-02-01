import { AwsConfigLoader } from '@nodelith/aws'
import { ConfigInitializer } from '@nodelith/config'
import { MongodbInitializer } from '@nodelith/mongodb'
import { ExpressConfig, ExpressContainer } from '@nodelith/express'

import * as Api from '@example/api'
import * as Domain from '@example/domain'
import * as Infrastructure from '@example/infrastructure'

async function start() {

  const container = new ExpressContainer()

  container.registerValue('logger', console)
  container.registerValue('configProfile', Api.configProfile)
  container.registerValue('configDefaults', Api.configDefaults)
  
  container.registerClass('configLoader', AwsConfigLoader)
  container.registerInitializer('config', ConfigInitializer)
  container.registerInitializer('mongodb', MongodbInitializer)
  
  container.registerClass('petService', Domain.PetService)
  container.registerClass('petRepository', Infrastructure.MongodbPetRepository)

  await container.initialize(console)

  const server = container.resolveExpress(
    Api.PetController,
  )

  container.resolveFunction((expressConfig: ExpressConfig) => {
    server.listen(expressConfig.serverPort, () => {
      console.log(`${expressConfig.serverName} listening on port ${expressConfig.serverPort}`)
    })
  })
}

start()
