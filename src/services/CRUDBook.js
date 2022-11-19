
import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10)
let createNewBook = async (data) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            await db.Book.create(
                {
                    name:data.name,
                    description:data.description,
                    author: data.author,
                    category:data.category,
                    pageCounter:data.pageCounter,
                    image:data.image,
                })

                resolve('ok create ')
        }catch(e)
        {
            reject(e)
        }
    })
}
let getAllBook =  () =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let books = db.Book.findAll(
                {
                    raw: true,
                })
            resolve(books)
        } catch(e)
        {
            reject(e)
        }
    })
}
let getBookInfoById = (bookId) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let book= await db.Book.findOne(
                {
                    where: {id: bookId},
                    raw: true,
                })    
            if(book)
            {
                resolve(book)
            }
            else
            {
                resolve({})
            }
        }catch(e)
        {
            reject (e)
        }
    })
}
let updateBookData = (data) =>
{
    return new Promise(async(resolve, reject)=>
    {
        try
        {
            let book = await db.Book.findOne(
                {
                    where: {id: data.id}
                })
                if(book)
                {
                    book.name = data.name
                    book.description= data.description
                    book.author = data.author
                    book.category = data.category
                    book.pageCounter = data.pageCounter
                    book.image = data.image


                    await book.save()
                    let allBooks= await db.Book.findAll()
                    resolve(allBooks)
                }
                else
                {
                    resolve()
                }
        }catch(e)
        {
            console.log(e)
        }
    })
}
let deleteBookById = (bookId)=>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let book =await db.Book.findOne(
                {
                    where: {id: bookId,}
                })
            if(book)
            {
                await book.destroy()
            }
            resolve() // thoat ra khoi async 
        }catch(e)
        {
            reject(e)
        }
    })
}
module.exports= 
{
    createNewBook: createNewBook,
    getAllBook: getAllBook,
    getBookInfoById: getBookInfoById,
    updateBookData: updateBookData,
    deleteBookById: deleteBookById,
}