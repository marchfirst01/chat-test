import express from "express";
import asyncHandler from "express-async-handler";

import { addNewMessageController, createChatRoomController } from "../controllers/chat.controller.js";

export const chatRouter = express.Router();

chatRouter.post('/room/create', asyncHandler(createChatRoomController));
chatRouter.post('/room/new_message', asyncHandler(addNewMessageController));