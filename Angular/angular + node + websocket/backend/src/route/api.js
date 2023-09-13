import express from "express";
import APIController from "../controller/APIController";
import AuthenController from "../controller/AuthenController";
import { checkTokenMiddleware } from "../middleware";
import { upload, uploadAvatar } from '../uploads'; 

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/getAllRoomChat", APIController.getAllRoomChat);
  router.post("/createOrSelectRoomChat", APIController.createOrSelectRoomChat);
  // router.get('/users', checkTokenMiddleware, APIController.getAllUsers); // method GET -> READ data
  router.get("/getMessageInRoom", APIController.getMessageInRoom);
  router.post("/postMessageInRoom", APIController.postMessageInRoom);
  router.delete(
    "/deleteMessageUserInRoom",
    APIController.deleteMessageUserInRoom
  ); // method POST -> CREATE data getDescription
  router.delete("/deleteRoomAip", APIController.deleteRoomAip);
  router.put("/editMessageUserInRoom", APIController.editMessageUserInRoom);
  router.post(
    '/uploadAvatar',
    upload.single('avatar'), // 'avatar' là tên trường chứa tệp ảnh trên máy chủ
    uploadAvatar
  );
  

  // router.put('/update-user/:id', APIController.updateUser); //method PUT -> UPDATE data
  // router.delete('/delete-user/:id', APIController.deleteUser); //method DELETE -> DELETE data
  // router.get('/get-description', APIController.getDescription); // method POST -> CREATE data getDescription
  router.post("/login", AuthenController.login); // method POST -> CREATE data getDescription
  router.post("/register", AuthenController.register); // method POST -> CREATE data getDescription
  router.post("/refresh-token", AuthenController.refreshToken); // method POST -> CREATE data getDescription

  
  return app.use("/api/v1/", router);
};

export default initAPIRoute;
