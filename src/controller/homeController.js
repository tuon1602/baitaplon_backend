import { response } from 'express'
import db from '../models/index'
import CRUDService from '../services/CRUDService'
import CRUDBook from '../services/CRUDBook'
let getHomePage = async (req,res) =>
{
    try
    {
        let data = await db.User.findAll()
        console.log('-------------------')
        console.log(data)
        console.log('-------------------')
        return res.render('homePage.ejs', 
        {
            data:JSON.stringify(data)
        })
    }
    catch(e)
    {
        console.log(e)
    }

  
}
let getAboutPage = (req,res) =>
{
    return res.render('test/about.ejs')
}

let getCRUD = (req,res) =>
{
    return res.render('crud.ejs')
}
let postCRUD = async (req,res) =>
{
    let message =await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post crud from server')
}
let displayGetCRUD = async(req,res)=>
{
    let data= await CRUDService.getAllUser()
    console.log('-0-------------------')
    console.log(data)
    console.log('-0-------------------')
    return res.render('displayCRUD.ejs', 
    {
        dataTable: data,
    })
}
let getEditCRUD = async (req,res) =>
{
    let userId = req.query.id
    if(userId)
    {
        let userData = await CRUDService.getUserInfoById(userId)

        // let userData
       return res.render('editCRUD.ejs', 
    {
        user: userData,
    })
    }
    else
    {
        return res.send('user not found')
    }
}
let putCRUD = async(req,res) =>
{
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs',
    {
         dataTable:allUsers
    })

    
}
let deleteCRUD= async (req,res)=>
{
    let id = req.query.id
    if(id)
    {
        await CRUDService.deleteUserById(id);
        return res.send('delete user succeed')
    }
    else
    {
        return res.send('user not found')
    }
   
}

//device

let getBookCRUD = (req,res) =>{
    return res.render('books/createbook.ejs')
}
let postBookCRUD = async (req,res) =>{
    let message = await CRUDBook.createNewBook(req.body)
    console.log(message)
    return res.send('post BookCRUD from server')
}

let getAllBook = async (req,res) =>
{
    try
    {
        let data = await db.Book.findAll()
        console.log('-------------------')
        console.log(data)
        console.log('-------------------')
        return res.render(data)
    }
    catch(e)
    {
        console.log(e)
    }

  
}
// let getAllDevice = async (req,res) =>{
//     let data = await CRUDServiceDevice.getAllDevice()
//     return res.render('devices/displaydevices.ejs',{
//         dataTable:data,
//     })

// }
// let getEditDeviceCRUD = async (req,res) =>
// {
//     let deviceId = req.query.id
//     if(deviceId)
//     {
//         let deviceData = await CRUDServiceDevice.getDeviceInfoById(deviceId)

//         // let userData
//        return res.render('devices/editDeviceCRUD.ejs', 
//     {
//         device: deviceData,
//     })
//     }
//     else
//     {
//         return res.send('device not found')
//     }
// }
// let updateDeviceCRUD = async (req,res) =>{
//     let data = req.body;
//     let allDeviceData = await CRUDServiceDevice.updateDeviceData(data)
//     res.render('devices/displaydevices.ejs',
//     {dataTable:data
//     })
// }
// let deleteDeviceCRUD= async (req,res)=>
// {
//     let id = req.query.id
//     if(id)
//     {
//         await CRUDServiceDevice.deleteDeviceById(id);
//         return res.send('delete Device succeed')
//     }
//     else
//     {
//         return res.send('Device not found')
//     }
   
// }
module.exports = 
{
    //users
    getHomePage: getHomePage,
    getAboutPage:getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

    //devices
    getBookCRUD:getBookCRUD,
    postBookCRUD:postBookCRUD,
    getAllBook:getAllBook,
    // getAllDevice: getAllDevice,
    // getEditDeviceCRUD: getEditDeviceCRUD,
    // updateDeviceCRUD: updateDeviceCRUD,
    // deleteDeviceCRUD: deleteDeviceCRUD,
}
