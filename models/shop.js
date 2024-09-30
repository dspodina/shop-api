// import modules and dependencies
import { v4 as Id } from 'uuid';

const cakes = [
    {
        id: Id(),
        name: 'Vanilla Cake',
        price: 110,
        description: 'Vanilla cake with vanilla buttercream and fruits.',
        img: 'https://bakerbynature.com/wp-content/uploads/2022/04/Golden-Vanilla-Cake-with-Vanilla-Frosting0-19.jpg'
    },
    {
        id: Id(),
        name: 'Pink velvet Cake',
        price: 100,
        description:
            'Tender light pink sponge cake layers, strawberry filling and pink vanilla buttercream.',
        img: 'https://dinnerthendessert.com/wp-content/uploads/2023/06/Pink-Velvet-Cake-26.jpg'
    },
    {
        id: Id(),
        name: 'Chocolate Cake',
        price: 90,
        description: 'It is rich, chocolatey and moist with a perfect crumb!',
        img: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-superJumbo.jpg'
    }
];

class CakeShop {
    static getAllCakes() {
        return cakes;
    }
    static getCakeById(id) {
        return cakes.find((cake) => cake.id === id);
    }
    static add(cake) {
        const newCake = {
            id: Id(),
            ...cake
        };
        cakes.push(newCake);
        return newCake;
    }
}

export default CakeShop;
