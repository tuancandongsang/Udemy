import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers); // method GET -> READ data
    router.post('/create-user', APIController.createNewUser); // method POST -> CREATE data
    router.put('/update-user/:id', APIController.updateUser); //method PUT -> UPDATE data
    router.delete('/delete-user/:id', APIController.deleteUser); //method DELETE -> DELETE data
    router.put('/description', APIController.createDescription); // method POST -> CREATE data getDescription
    router.get('/get-description', APIController.getDescription); // method POST -> CREATE data getDescription

    return app.use('/api/v1/', router)
}


export default initAPIRoute;
