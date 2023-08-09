import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middlewares/auth.js';
import { 
    getAdministrationSessionsController,
    getCurrentSessionsController,
    getFailLoginSessionsController,
    getFailRegisterSessionsController,
    getGithubCallbackSessionsController,
    getLoginSessionsController, 
    getLogoutSessionsController, 
    getProfileSessionsController, 
    getRegisterSessionsController, 
    passportLoginSessionsController,
    passportRegisterSessionsController
} from '../controllers/sessions.controllers.js';


const router = express.Router();


router.get('/login', getLoginSessionsController);
router.get('/register', getRegisterSessionsController);
router.get('/profile', isUser, getProfileSessionsController);
router.get('/logout', getLogoutSessionsController);
router.get('/administration', isUser, isAdmin, getAdministrationSessionsController);
router.get('/failregister', getFailRegisterSessionsController);
router.get('/faillogin', getFailLoginSessionsController);
router.get('/current', getCurrentSessionsController);

// PASSPORT GITHUB
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), getGithubCallbackSessionsController);

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), passportLoginSessionsController);
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), passportRegisterSessionsController);

export default router;