import express from "express";
import homeController from "../controller/homeController"
import userController from "../controller/userController"
import bookController from '../controller/bookController'
import CartController from '../controller/CartController'
import CommentController from '../controller/CommentController'

let router = express.Router();

let initWebRoutes = (app) =>
{
    router.get('/',homeController.getHomePage) ///display all user
    router.get('/about',homeController.getAboutPage)
    router.get('/user-crud',homeController.getCRUD) //make a form to create user
    router.post('/post-crud',homeController.postCRUD) //create user
    router.get('/get-crud',homeController.displayGetCRUD) //get user from db
    router.get('/edit-crud',homeController.getEditCRUD)
    router.post('/put-crud',homeController.putCRUD)
    router.get('/delete-crud',homeController.deleteCRUD)

    //device
    // router.get('/book-crud',homeController.getBookCRUD)
    // router.post('/book-created',homeController.postBookCRUD)
    // router.get('/api/get-all-book',homeController.getAllBook)
    // router.get('/display-all-device',homeController.getAllDevice)
    // router.get('/edit-device-crud', homeController.getEditDeviceCRUD)
    // router.post('/put-device-crud', homeController.updateDeviceCRUD)
    // router.get('/delete-device-crud',homeController.deleteDeviceCRUD)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-user-by-id',userController.handleGetUserById)
    router.get('/api/get-all-users', userController.handleGetAllUser)
    router.get('/api/get-one-user',userController.handleGetUser)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser) //restapi
    
    router.get('/api/get-all-books',bookController.handleGetAllBook)
    router.post('/api/create-new-book',bookController.handleCreateNewBook)
    router.delete('/api/delete-book/',bookController.handleDeleteBook)
    router.put('/api/edit-book',bookController.handleEditBook)
    //cart
    router.post('/api/post-cart',CartController.handleCreateCart)
    router.get('/api/get-all-cart',CartController.handleGetAllCart)
    router.put('/api/update-amount',CartController.handleUpdateAmount)
    router.delete('/api/delete-cart',CartController.handleDeleteCart)
    //comment
    router.post('/api/post-comment',CommentController.handleCreateComment)
    router.get('/api/get-all-comment',CommentController.handleGetAllComment)
    
    //rest api method : get
    return app.use("/",router)
}

module.exports = initWebRoutes;