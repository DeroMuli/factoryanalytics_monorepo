import { Router , Request , Response } from 'express'
import FactoryEquipmentDataRouter from './factoryequipmentdata.routes'

const router = Router()

router.use('/factoryequipmentdata', FactoryEquipmentDataRouter)

export default router