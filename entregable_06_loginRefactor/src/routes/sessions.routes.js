import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';
import { isUser, isAdmin } from '../middlewares/auth.js';

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
})

router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).render('error', { error: 'complete email and pass' });
        }

        const user = await UserModel.findOne({ email: email });

        if (user && user.pass == pass) {
            req.session.email = email;
            if (user.isAdmin) {
                req.session.isAdmin = true;
            } else {
                req.session.isAdmin = false;
            }
            return res.redirect('/api/sessions/profile');
        } else {
            return res.status(401).render('error', { error: 'Wrong pass or email' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

router.post('/register', async (req, res) => {
    const { email, pass, firstName, lastName } = req.body
    if (!email || !pass || !firstName || !lastName) {
        return res.status(400).render('error', { error: 'wrong data' })
    }
    try {
        await UserModel.create({ email, pass, firstName, lastName, isAdmin: false });
        req.session.email = email
        req.session.isAdmin = false

        return res.redirect('/api/sessions/profile')
    } catch (error) {
        console.log(error)
        return res.status(400).render('error', { error: 'Cannot create user. Try with another mail' })
    }
})

export default router;