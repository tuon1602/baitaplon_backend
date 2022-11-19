import db from "../models/index"

// let getAllBooks = (bookId)=>
// {
//     return new Promise(async(resolve,reject)=>
//     {
//         try
//         {
//             let books=''
//             if(bookId === 'ALL')
//             {
//                 books= await db.Book.findAll(
                    
//                     {
//                         attributes:
//                         {
//                             // exclude:['password']
//                         },
//                     })
//                     console.log(books)
                    
//             } 
            
//             // if(bookId && bookId !='ALL')
//             // {
//             //     books= await db.Book.findOne(
//             //         {
//             //             where:{id : bookId},
//             //             attributes:
//             //             {
//             //                 // exclude:['password']
//             //             },
//             //         })
//             // }
//             resolve(books)
//         }catch(e)
//         {
//             reject(e)
//         }
//     })
// }
let checkBookName = (bookName) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let book = await db.Book.findOne(
                {
                    where: {name: bookName}
                })
            if(book)
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

let getAllBooks = () =>{
    return db.Book.findAll()
}

let createNewBook = (data) =>
{
    return new Promise(async(resolve,reject)=>
    {
        try
        {
            let check = await checkBookName(data.name)
            if(check===true)
            {
                resolve(
                    {
                        errCode:1,
                        errMessage: "This Book exist"
                    })
            }
            else
            {
            
                await db.Book.create(
                    {
                        name:data.name,
                        author:data.author,
                        description:data.description,
                        category:data.category,
                        pageCounter:data.pageCounter,
                        image:data.image
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
let deleteBook = (bookId) =>
{
    return new Promise(async(resolve,reject)=>
    {
        let book = await db.Book.findOne(
            {
                where: {id:bookId}
            })
        await db.Book.destroy(
            {
                where:{id:bookId}
            })
        resolve(
            {
                errCode:0,
                message:"user deleted"
            })
    })
}
let updateBookData = (data) =>
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
            let book = await db.Book.findOne(
                {
                    where:{id: data.id},
                    raw:false
                })
            if(book)
            {
                book.name = data.name
                book.author = data.author
                book.description = data.description
                book.category = data.category
                book.pageCounter = data.pageCounter
                await book.save()

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
                        errMessage:"book not found"
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
    getAllBooks:getAllBooks,
    createNewBook:createNewBook,
    deleteBook:deleteBook,
    updateBookData:updateBookData,
}