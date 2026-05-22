import express from 'express';
import { login, logout, register, token } from '../controllers/AuthController.js';
import { authenticateToken, FindUser } from '../middlewares/ProtectedMiddleware.js';

const AuthRouter = express.Router();

AuthRouter.get('/token', authenticateToken, FindUser, token)
AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
export default AuthRouter;