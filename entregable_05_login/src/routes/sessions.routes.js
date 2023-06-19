import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';


const router = express.Router();




router.get('/login', async (req, res) => {
    try {
        return res.render('login', {});
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

router.get('/register', async (req, res) => {
    try {
        return res.render('register', {});
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

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
            return res.redirect('/profile');
        } else {
            return res.status(401).render('error', { error: 'Wrong pass or email' });
        }
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
});

export default router;