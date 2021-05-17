const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users'
        };

        // DB Connection
        this.connectDB();
        
        // Middlewares 
        this.middlewares()
        
        // Routes
        this.routes();
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port);
        });
    }

    routes() {
        this.app.use(this.paths.auth,       require('../routes/auth.route'));
        this.app.use(this.paths.categories, require('../routes/category.route'));
        this.app.use(this.paths.products,   require('../routes/product.route'));
        this.app.use(this.paths.search,     require('../routes/search.route'));
        this.app.use(this.paths.users,      require('../routes/user.route'));
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Read and Parse body
        this.app.use(express.json());

        // tatic content
        this.app.use(express.static('public'));
    }

    async connectDB() {
        await dbConnection();
    }

}

module.exports = Server;