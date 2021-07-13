import {Request, Response} from 'express'
export const getUsers=(req: Request, res:Response)=>{
    res.json({
        msg: 'getUsuarios'
    })
}

export const getUser=(req: Request, res:Response)=>{
    const { id } = req.params;
    res.json({
        msg: 'getUsuari'
    })
}

export const postUser=(req: Request, res:Response)=>{
    const { body } = req;
    res.json({
        msg: 'post usuario'
    })
}

export const putUser=(req: Request, res:Response)=>{
    const { id } = req.params;
    const { body } =req;
    res.json({
        msg: 'put usuario'
    })
}

export const deleteUser=(req: Request, res:Response)=>{
    const { id } = req.params;
    res.json({
        msg: 'delete usuario',
        id: id
    })
}