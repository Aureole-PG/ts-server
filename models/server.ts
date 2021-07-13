import express,{Application} from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
class Server {
    private app: Application;
    private port: string;
    private apiPaths= {
        users: '/api/users'
    }
    constructor() {
        this.app= express();
        this.port = process.env.PORT || "3000";
        this.middleWares()
        this.routers()
    }

    routers(){
        this.app.use(this.apiPaths.users, userRoutes)
    }

    middleWares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log("server is runnig in port "+ this.port)
        })
    }
}

export default Server