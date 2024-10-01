import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import validatePassword from '../utils/validatePassword.js';
import validateEmail from '../utils/validateEmail.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: (req, res) => {
        const { email, password, rePassword } = req.body;

        // check if email already exist
        const emailExist = User.getByEmail(email);
        if (emailExist) {
            res.status(400).render('404', {
                title: 'Email already exist',
                message: 'Email already exist'
            });
        }

        // validate email, password and check the match
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doPasswordMatch = matchPasswords(password, rePassword);

        if (isValidEmail && isValidPassword && doPasswordMatch) {
            // hash password
            const hashedPassword = hashPassword(password);

            //  create user
            User.addUser({ email, password: hashedPassword });

            // redirect to login
            return res.status(302).redirect('/api/login');
        } else {
            return res.status(400).render('404', {
                title: 'Invalid email or password',
                message: 'Invalid email or password'
            });
        }
    },
    login: (req, res) => {
        const { email, password } = req.body;
        // check if email already exist
        const emailExist = User.getByEmail(email);
        if (!emailExist) {
            res.status(404).render('404', {
                title: 'User not found',
                message: 'User not found. Please, register!'
            });
        }

        // check if the password is correct
        bcrypt.compare(password, emailExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }
            if (isValid) {
                // create token
                const token = jwt.sign(
                    { email: emailExist.email },
                    process.env.TOKEN_SECRET
                );
                if (token) {
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).redirect('/api/cakes');
                }
            } else {
                res.status(409).render('404', {
                    title: 'Invalid password or email',
                    message: 'The password or email is invalid'
                });
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).redirect('/api/cakes');
    },

    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    }
};

export default userControllers;
