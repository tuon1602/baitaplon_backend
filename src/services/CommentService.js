import db from "../models/index"

const createNewComment = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try{
            await db.Comment.create({
                username:data.username,
                bookId:data.bookId,
                content:data.content,
                rating:data.rating
            })
            resolve({
                message:"ok"
            })
        }
        catch(e){
            reject(e)
        }
    })
}
const getAllComments = (bookId) =>{
    return db.Comment.findAll({
        where:{bookId:bookId}
    })
}

module.exports = 
{
    createNewComment:createNewComment,
    getAllComments:getAllComments
}