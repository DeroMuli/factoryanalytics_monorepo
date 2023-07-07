import FactoryEquipmentData from "../models/FactoryEquipmentDataModel"
import type { FactoryEquipmentDataAttributes } from "../models/FactoryEquipmentDataModel"

const getallfactorydata = async () => {
    const allfactorydata = await FactoryEquipmentData.findAll()
    return allfactorydata
}

const getfactorydatawithid = async (id : number) => {
    const factorydata = await FactoryEquipmentData.findOne({
        where : {
            id
        }
    })
    return factorydata
}

const updatemeanspeedwithid = async (id : number, mean_speed : number) => {
    await FactoryEquipmentData.update({mean_speed} , {where : {id}})
}

const updatemeantorquewithid = async (id : number, mean_torque : number) => {
    await FactoryEquipmentData.update({mean_torque} , {where : {id}})
}

const updatemeantempwithid = async (id : number, mean_temp : number) => {
    await FactoryEquipmentData.update({mean_temp} , {where : {id}})
}

const deletefactorydatawithid =async (id : number) => {
    await FactoryEquipmentData.destroy({
        where : {
            id
        }
    })
}

const addfactorydata = async (data : FactoryEquipmentDataAttributes)=> {
    const result = await FactoryEquipmentData.create(data)
    return result
}

export {getfactorydatawithid , updatemeanspeedwithid , deletefactorydatawithid , addfactorydata , getallfactorydata , updatemeantorquewithid , updatemeantempwithid }