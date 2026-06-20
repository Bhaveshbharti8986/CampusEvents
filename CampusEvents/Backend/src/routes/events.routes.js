import { Router } from "express";
import * as eventController from '../controllers/event.controller.js'
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const eventRouter=Router();

//public routes 

eventRouter.get('/',eventController.getAllEvents);
eventRouter.get('/:id',eventController.getEventById);
eventRouter.get('/student/dashboard', verifyToken, eventController.getStudentDashboard);

eventRouter.post('/create', verifyToken, isAdmin, eventController.createEvent); //create new event
eventRouter.put('/:id', verifyToken, isAdmin, eventController.updateEvent); //update event
eventRouter.delete('/:id', verifyToken, isAdmin, eventController.deleteEvent); //delete event
eventRouter.get('/admin/stats', verifyToken, isAdmin, eventController.getAdminDashboard)


eventRouter.post('/:id/register', verifyToken, eventController.registerForEvent);
export default eventRouter


