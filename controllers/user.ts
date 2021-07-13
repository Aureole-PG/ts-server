import {Request, Response} from 'express'
import {User} from '../models/user'
export const getUsers=async(req: Request, res:Response)=>{
    const users = await User.findAll();
    res.json(users)
}

export const getUser = async(req: Request, res:Response)=>{
    
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user){
        res.json(user)
    }else{
        res.status(404).json({
            msg: 'user not found ' + id
        })
    }
    
}

export const postUser = async(req: Request, res:Response)=>{
    try {
        const { body } = req;
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        })
        if (!existEmail) {
            res.status(404).json({
                msg: 'email aready exist '
            })
            return 
        }
        const user = new User(body);
        await user.save();
        res.json(user)    
    } catch (error) {
        res.status(404).json({
            msg: 'Please talk with admin'
        })
    }
    
}

export const putUser = async(req: Request, res:Response)=>{
    
    try {
        const { id } = req.params;
        const { body } = req;
        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({
                msg: 'User not exist'
            })
            return 
        }
        await user.update(body);
        res.json(user)    
    } catch (error) {
        res.status(404).json({
            msg: 'Please talk with admin'
        })
    }
}

export const deleteUser = async(req: Request, res:Response)=>{
    const { id } = req.params;
    const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({
                msg: 'User not exist'
            })
            return 
        }
    // await user.destroy(); //deleted user from database 
    await user.updated({state: false})
    res.json({
        msg: 'delete usuario',
        id: id
    })
}