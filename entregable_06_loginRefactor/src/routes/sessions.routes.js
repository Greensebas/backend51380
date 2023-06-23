import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';
import { isUser, isAdmin } from '../middlewares/auth.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = express.Router();




router.get('/login', async (req, res) => {
    try {
        return res.render('login', {});
    }
    catch (error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

router.get('/register', async (req, res) => {
    try {
        return res.render('register', {});
    }
    catch (error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

router.get('/profile', isUser, (req, res) => {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin }
    return res.render('profile', { user })
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: "Unspected error. Session can't be destroyed" });
        }
        return res.redirect('/api/sessions/login');
    });
});

router.get('/administration', isUser, isAdmin, (req, res) => {
    return res.send('Data only seen by admins')
});

router.get('/failregister', (req, res) => {
    return res.json({ error: 'fail to register' });
});

router.get('/faillogin', async (req, res) => {
    return res.json({ error: 'fail to login' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    try {
        if (!req.user) {
            return res.json({ error: 'invalid credentials' });
        }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

        return res.json({ msg: 'ok', payload: req.user });
    }
    catch (error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    try {
        if (!req.user) {
            return res.json({ error: 'something went wrong' });
        }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

        return res.json({ msg: 'ok', payload: req.user });
    }
    catch (error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

export default router;