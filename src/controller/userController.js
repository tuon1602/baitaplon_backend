import res from "express/lib/response";
import userService from "../services/userService"

let handleLogin = async (req,res) =>
{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password)
    {
        return res.status(500).json(
            {
                errCode:1,
                message:"Missing inputs parameters"
            })
    }
    let userData = await userService.handleUserLogin(email,password)
    return res.status(200).json(
        {
            errCode:userData.errCode,
            message:userData.errMessage,
            user: userData.user ? userData.user : {}
        })
}

let handleGetAllUser = async(req,res)=>
{
    let id= req.query.id
    if(!id)
    {
        return res.status(200).json(
            {
                errCode :1,
                errMessage: 'Missing requirement parameters',
                users:[]
            })
    }
    let users = await userService.getAllUsers(id)
    return res.status(200).json(
        {
            errCode:0,
            errMessage:'Ok',
            users
        })
}
let handleCreateNewUser = async (req,res) =>
{
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req,res) =>
{
    if(!req.body.id)
    {
        return res.status(200).json(
            {
                errCode:1,
                errMessage: "missing parameters"
            })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser = async (req,res) => 
{
    let data = req.body
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}
module.exports = {
    handleLogin:handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser
}