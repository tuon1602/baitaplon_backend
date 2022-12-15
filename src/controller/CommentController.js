import CommentService from "../services/CommentService"

//post
let handleCreateComment = async (req,res) =>
{
    let message = await CommentService.createNewComment(req.body)
    return res.status(200).json({
        message
    })
}
let handleGetAllComment = async(req,res)=>{
    let bookId = req.query.bookId
    let comments = await CommentService.getAllComments(bookId)
    console.log(comments)
    return res.status(200).json(
        {
            // errCode:0,
            // errMessage:'Ok',
            comments
        })
}

module.exports = {
    handleCreateComment:handleCreateComment,
    handleGetAllComment:handleGetAllComment
    
}