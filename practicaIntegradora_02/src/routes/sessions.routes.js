import express from 'express';
import passport from 'passport';
import { isAdmin, isUser } from '../middlewares/auth.js';

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
    const user = { email: req.session.user.email, isAdmin: req.session.user.role }
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

// PASSPORT GITHUB
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/views');
});

router.get('/current', (req, res) => {
  return res.send(req.session);
});



router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    try {
        if (!req.user) {
            return res.json({ error: 'invalid credentials' });
        }
        req.session.user = { 
            _id: req.user._id, 
            email: req.user.email, 
            firstName: req.user.firstName, 
            lastName: req.user.lastName, 
            age: req.user.age,
            cartId: req.user.cartId,
            role: req.user.role, 
        };

        return res.redirect('/views/products');
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
        req.session.user = { 
            _id: req.user._id, 
            email: req.user.email, 
            firstName: req.user.firstName, 
            lastName: req.user.lastName, 
            age: req.user.age,
            cartId: req.user.cartId,
            role: req.user.role, 
        };

        return res.json({ msg: 'ok', payload: req.user });
    }
    catch (error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

export default router;