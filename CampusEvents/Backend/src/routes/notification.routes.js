import { Router } from "express";
import * as notificationController from '../controllers/notification.controller.js'
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const notificationRouter=Router();

notificationRouter.post('/create',  notificationController.createNotification);
notificationRouter.get('/getAll',  notificationController.getAllNotifications);

export default notificationRouter