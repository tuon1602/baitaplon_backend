import OrderService from "../services/OrderService"

let handleCreateNewOrder = async (req,res) =>
{
    // console.log(req)
    let message = await OrderService.createOrder(req.body)
    return res.status(200).json({
        message
    })
}
let handleGetAllOrder = async(req,res)=>{
    let userId = req.query.userId
    let orders = await OrderService.getAllOrderData(userId)
    // console.log(orders)
    return res.status(200).json(
        {
            // errCode:0,
            // errMessage:'Ok',
            orders
        })
}
let handleGetAllBook = async(req,res)=>{
    
    let orderId = req.query.orderId
    // let bookId = req.body.bookId
    let orders = await OrderService.getAllBookDataByOrderId(orderId)
    return res.status(200).json(
        orders
    )
}
//fix this
let handleDeleteCartWhenNavigate = async(req,res)=>{
    let userId = req.query.userId
    let idData = req.query.idData
    let order = await OrderService.deleteAllCartsWhenNavigate(userId,idData)
    console.log(order)
    return res.status(200).json(
        order
    )
}
let handleUpdateStatus = async(req,res)=>{
    let data = req.body
    let message = await OrderService.updateStatus(data)
    return res.status(200).json(message)
    
}
module.exports = {
    handleCreateNewOrder:handleCreateNewOrder,
    handleGetAllOrder:handleGetAllOrder,
    handleDeleteCartWhenNavigate:handleDeleteCartWhenNavigate,
    handleGetAllBook:handleGetAllBook,
    handleUpdateStatus:handleUpdateStatus
}