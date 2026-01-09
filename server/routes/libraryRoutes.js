import express from "express";
import { addToLibrary,getMyLibrary, removeFromLibrary } from "../controllers/libraryController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const libraryRouter = express.Router();

libraryRouter.post("/", requireAuth, addToLibrary);
libraryRouter.get('/',requireAuth,getMyLibrary)
libraryRouter.delete('/:bookId',requireAuth,removeFromLibrary)

export default libraryRouter;
