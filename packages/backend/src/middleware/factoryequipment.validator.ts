import Joi from "joi"
import { Request, Response , NextFunction} from "express"

const addequipmentvalidation = Joi.object({
    name : Joi.string().required(),
    mean_speed : Joi.number().required(),
    mean_torque : Joi.number().required(),
    mean_temp : Joi.number().required(),
    icon_library : Joi.string().required(),
    icon_name : Joi.string().required()
})

const meanspeedvalidation = Joi.object({
    id : Joi.number().required(),
    mean_speed : Joi.number().required()
})

const meantempvalidation = Joi.object({
    id : Joi.number().required(),
    mean_temp : Joi.number().required()
})

const meantorquevalidation = Joi.object({
    id : Joi.number().required(),
    mean_torque : Joi.number().required()
})

export const add_equipment_validator = async (req : Request , res : Response , next : NextFunction) => {
    const {error} = await addequipmentvalidation.validate(req.body)
    if(error){
        res.status(400).json(error)
    }
    else{
        next()
    }
}

export const update_mean_speed_validator = async (req : Request, res : Response, next : NextFunction ) => {
    const {error} = await meanspeedvalidation.validate(req.body)
    if(error){
        res.status(400).json(error)
    }
    else
       next()
}

export const update_mean_temp_validator = async (req : Request , res : Response, next : NextFunction) => {
    const {error} = await meantempvalidation.validate(req.body)
    if(error){
        res.status(400).json(error)
    }
    else
        next()
}

export const update_mean_torque_validator = async (req : Request, res : Response, next : NextFunction) => {
    const {error} = await meantorquevalidation.validate(req.body)
    if(error){
        res.status(400).json(error)
    }
    else
        next()
}