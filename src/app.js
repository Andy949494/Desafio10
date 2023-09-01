import express from 'express';
import session from 'express-session';
import cookieParser from "cookie-parser";
import {Server} from "socket.io";
import {engine} from 'express-handlebars';
import 'dotenv/config';
import config from './config/config.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js'
import flash from 'connect-flash';
import ProductManager from './dao/memory/products.memory.js'
import CartsRouter from './routes/carts.routerDB.js';
import ProductsRouter from './routes/products.routerDB.js';
import messageModel from './dao/models/messages.model.js';
import ViewsRouter from './routes/views.router.js';
import UsersRouter from './routes/users.routerDB.js';
import SessionsRouter from './routes/sessions.router.js'
import __dirname from './utils.js'
import errorHandler from "./middlewares/error/info.js"
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const productsManager = new ProductManager(`${__dirname}/products.json`);

app.engine('handlebars', engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser());
app.use(errorHandler);


app.use(session({
    secret: 's3cr3t',
    resave: false,
    saveUninitialized: false
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion en Swagger',
            description: 'Documentación de los módulos de productos y carritos.'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const productsRouter = new ProductsRouter()
const cartsRouter =  new CartsRouter()
const viewsRouter = new ViewsRouter()
const sessionsRouter = new SessionsRouter()
const usersRouter = new UsersRouter()

app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/', viewsRouter.getRouter());


const httpserver = app.listen(config.port,()=>console.log(`Server running on PORT: ${config.port}`))

//const connection = mongoose.connect(config.mongoUrl)

const io = new Server(httpserver);


io.on('connection',async(socket)=>{
    console.log('New connection.')
    const products = await productsManager.getProducts()
    socket.emit('data_update',{products})
    socket.on('delete_product',async(data)=>{
        await productsManager.deleteProduct(parseInt(data))
        const updateProducts=await productsManager.getProducts()
        console.log(updateProducts)
        io.sockets.emit('update_from_server',updateProducts)
    })
  
    socket.on('new_product_to_server',async(data)=>{
        const newproduct=await productsManager.addProduct(data)
        console.log(newproduct)
        const newproducts=await productsManager.getProducts()
        io.sockets.emit('new_products_from_server',newproducts)
    })
})

const logs = []

io.on('connection',socket =>{
    console.log("Connected")
    socket.on("message", async data=>{
        logs.push({socketid:socket.id,message:data})
        let user = socket.id;
        let message = data;
        await messageModel.create({user,message});
        io.emit('log',{logs});
    })
})
