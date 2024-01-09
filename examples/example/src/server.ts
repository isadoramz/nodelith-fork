import express from 'express'

import { AwsConfigLoader } from '@nodelith/aws'
import { ExpressContainer } from '@nodelith/express'
import { ConfigInitializer } from '@nodelith/config'
import { MongodbInitializer } from '@nodelith/mongodb'

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

  const application = express()

  application.use('/api', container.ResolveControllers(
    Api.PetController,
  ))

  container.resolveFunction((serverConfig: Api.ServerConfig) => {
    application.listen(serverConfig.port, () => {
      console.log(`${serverConfig.name} listening on port ${serverConfig.port}`)
    })
  })
}

start()
