import res from "express/lib/response";
import bookService from "../services/bookService"

let handleGetAllBook = async(req,res)=>
{
    let id= req.query.id
    // if(!id)
    // {
    //     return res.status(200).json(
    //         {
    //             errCode :1,
    //             errMessage: 'Missing requirement parameters',
    //             books:[]
    //         })
    // }
    let books = await bookService.getAllBooks()
    console.log(books)
    return res.status(200).json(
        {
            // errCode:0,
            // errMessage:'Ok',
            books
        })
}
let handleCreateNewBook = async (req,res) =>
{
    let message = await bookService.createNewBook(req.body)
    return res.status(200).json({
        errCode:0,
        errMessage:'ok',
        message
    })
}
let handleDeleteBook = async (req,res) =>
{
    if(!req.body.id)
    {
        return res.status(200).json(
            {
                errCode:1,
                errMessage: "missing parameters"
            })
    }
    let message = await bookService.deleteBook(req.body.id)
    return res.status(200).json(message)
}
const handleEditBook =async(req,res)=>{
    console.log(req)
    let data = req.body
    let message = await bookService.updateBookData(data)
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllBook:handleGetAllBook,
    handleCreateNewBook:handleCreateNewBook,
    handleDeleteBook:handleDeleteBook,
    handleEditBook:handleEditBook,
}