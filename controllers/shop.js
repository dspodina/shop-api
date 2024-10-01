import CakeShop from '../models/shop.js';

const shopControllers = {
    getAllCakes: (req, res) => {
        const cakes = CakeShop.getAllCakes();
        const token = req.cookies.token;
        const email = req.cookies.email;
        res.status(200).render('cakes', { cakes, token, email });
    },
    getCakeById: (req, res) => {
        const { id } = req.params;
        const cake = CakeShop.getCakeById(id);
        if (cake) {
            res.status(200).render('cake', { cake });
        } else {
            res.status(404).render('404', {
                title: 'No cakes',
                message: 'Cake not found'
            });
        }
    },
    addCakeForm: (req, res) => {
        res.status(200).render('addCakeForm');
    },
    addCake: (req, res) => {
        const { name, price, description, img } = req.body;
        if (name && price && description && img) {
            CakeShop.add({ name, price, description, img });
            res.status(302).redirect('/api/cakes');
        } else {
            res.status(404).render('404', {
                title: 'Bad request',
                message: 'All fields are required'
            });
        }
    }
};

export default shopControllers;
