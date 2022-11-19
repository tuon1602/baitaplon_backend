import db from "../models/index"
import bcrypt from "bcryptjs"


const salt = bcrypt.genSaltSync(10)

let hashUserPassword = (password) =>
{
    return new Promise(async(resolve, reject)=>
    {  
        try
        {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e)
        {
            reject(e)
        }
    })
}

let handleUserLogin = (email, password) =>
{
    return new Promise (async(resolve,reject)=>
    {
        try
        {
            let userData= {};
            let isExist = await checkUserEmail(email)
            if(isExist)
            {
                //user already exist
                //compare password
                let user = await db.User.findOne(
                    {
                        attributes: ['email','password'],
                        where: {email : email},
                        raw:true
                    })
                    if(user)
                    {
                        let check = await bcrypt.compareSync(password, user.password)
                        if(check)
                        {
                            userData.errCode= 0
                            userData.errMessage = "ok"
                            delete user.password
                            userData.user = user
                        }
                        else
                        {
                            userData.errCode = 3
                            userData.errMessage ="wrong password"
                        }
                    }
                    else
                    {
                        userData.errCode =2 
                        userData.errMessage = 'user not found'
                    }
            } 
            else
            {
                //return error
                userData.errCode =1 
                userData.errMessage = `your email isn't exist`
            }
            resolve(userData)
        }catch(e)
        {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let user = await db.User.findOne(
                {
                    where: {email: userEmail}
                })
            if(user)
            {
                resolve(true)
            }
            else 
            {
                resolve(false)
            }
        }
        catch(e)
        {
            reject(e)
        }
    })
}
let checkUserName = (userName)=>{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let user = await db.User.findOne(
                {
                    where: {username: userName}
                })
            if(user)
            {
                resolve(true)
            }
            else 
            {
                resolve(false)
            }
        }
        catch(e)
        {
            reject(e)
        }
    })
}

let getAllUsers = (userId)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let users=''
            if(userId === 'ALL')
            {
                users= await db.User.findAll(
                    {
                        attributes:
                        {
                            exclude:['password']
                        },
                    })
            } 
            if(userId && userId !='ALL')
            {
                users= await db.User.findOne(
                    {
                        where:{id : userId},
                        attributes:
                        {
                            exclude:['password']
                        },
                    })
            }
            resolve(users)
        }catch(e)
        {
            reject(e)
        }
    })
}

let createNewUser = (data) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let check = await checkUserEmail(data.email)
            let check2 = await checkUserName(data.username)
            if(check===true)
            {
                resolve(
                    {
                        errCode:1,
                        errMessage: "Email already in use"
                    })
            }
            if(check2===true){
                resolve({
                    errCode:1,
                    errMessage:"Username already in use"
                })
            }
            else
            {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create(
                    {
                        email:data.email,
                        password:hashPasswordFromBcrypt,
                        username:data.username
                    })
    
                    resolve(
                        {
                            errCode:0,
                            message:'ok'
                        })
            }
        }catch(e)
        {
            reject(e)
        }
    })
}

let deleteUser = (userId ) =>
{
    return new Promise(async(resolve,reject)=>
    {
        let user = await db.User.findOne(
            {
                where: {id:userId}
            })
        if(!user)
        {
            resolve(
                {
                    errCode:2,
                    errMessage:"user isn't exist"
                })
        }
        await db.User.destroy(
            {
                where:{id:userId}
            })
        resolve(
            {
                errCode:0,
                message:"user deleted"
            })
    })
}

let updateUserData = (data) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            if(!data.id)
            {
                resolve(
                    {
                        errCode:2,
                        errMessage:"missing parameters"
                    })
            }
            let user = await db.User.findOne(
                {
                    where:{id: data.id},
                    raw:false
                })
            if(user)
            {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.email = data.email
                await user.save()

                resolve(
                    {
                        errCode:0,
                        message:"updated"
                    })
            }
            else
            {
                resolve(
                    {
                        errCode:1,
                        errMessage:"user not found"
                    })
            }
        }
        catch(e)
        {
            reject(e)
        }
    })
}
module.exports = 
{
    handleUserLogin:handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData:updateUserData
}