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
                    return 0
            }
            if(data.name.trim()!=0 && data.author.trim()!=0  && data.category.trim()!=0 && data.pageCounter.trim()!=0 && data.description.trim()!=0 && data.dateCreated.trim()!=0)
            {
            
                await db.Book.create(
                    {
                        name:data.name,
                        author:data.author,
                        description:data.description,
                        category:data.category,
                        pageCounter:data.pageCounter,
                        image:data.image,
                        dateCreated:data.dateCreated
                    })
    
                    resolve(
                        {
                            errCode:0,
                            errMessage:'ok'
                        })
            }
            else{
                resolve({
                    errCode:2,
                    errMessage:'Missing parameters'
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
                message:"Book deleted"
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
                        errMessage:"Missing parameters"
                    })
            }
            if(data.name.length==0 || data.author.length==0 || data.category.length==0 || data.pageCounter.length==0 || data.description.length==0 || data.dateCreated.length==0){
                resolve({
                    errCode:1,
                    errMessage:"Missing input parameters"
                })
                return false
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
                book.dateCreated =data.dateCreated
                book.image = data.image
                await book.save()

                resolve(
                    {
                        errCode:0,
                        errMessage:"updated"
                    })
            }
            else
            {
                resolve(
                    {
                        errCode:1,
                        errMessage:"Book not found"
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