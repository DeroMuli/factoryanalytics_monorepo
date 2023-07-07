import { Router , Request , Response} from 'express'
import * as FactoryDataController from "../controllers/factoryequipmentdata.controller"
import { add_equipment_validator , update_mean_speed_validator , update_mean_temp_validator , update_mean_torque_validator} from '../middleware/factoryequipment.validator'

const FactoryEquipmentDataRouter = Router()

FactoryEquipmentDataRouter.get("/",async (req : Request , res : Response) => {
    const data = await FactoryDataController.getallfactorydata()
    res.status(200).json(data)
})

FactoryEquipmentDataRouter.get("/:id",async (req : Request, res : Response) => {
    const id  = Number(req.params.id)
    const result = await FactoryDataController.getfactorydatawithid(id)
    res.status(200).json(result)
})

FactoryEquipmentDataRouter.put("/update_mean_speed/", update_mean_speed_validator,async (req : Request , res : Response) => {
    const {id , mean_speed } = req.body
    const result = await FactoryDataController.updatemeanspeedwithid(id,mean_speed)
    res.status(200).json({success: true})
})

FactoryEquipmentDataRouter.put("/update_mean_torque/",update_mean_torque_validator ,async (req : Request , res : Response) => {
    const {id , mean_torgue }  = req.body
    const result = await FactoryDataController.updatemeantorquewithid(id,mean_torgue)
    res.status(200).json({success: true})
})

FactoryEquipmentDataRouter.put("/update_mean_temp/", update_mean_temp_validator,async (req : Request , res : Response) => {
    const {id , mean_temp}  = req.body
    const result = await FactoryDataController.updatemeantempwithid(id,mean_temp)
    res.status(200).json({success: true})
})

FactoryEquipmentDataRouter.delete("/:id",async (req : Request, res : Response) => {
    const id  = Number(req.params.id)
    const result = await FactoryDataController.deletefactorydatawithid(id)
    res.status(200).json({success: true})
})

FactoryEquipmentDataRouter.post("/",add_equipment_validator ,async (req : Request, res : Response) => {
    const {name , mean_speed , mean_torque , mean_temp , icon_library , icon_name } = req.body
    const result = await FactoryDataController.addfactorydata({
        name,
        mean_speed,
        mean_torque,
        mean_temp,
        icon_library,
        icon_name
    })
    res.status(200).json(result)
})

export default FactoryEquipmentDataRouter