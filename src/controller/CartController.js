import CartService from "../services/CartService";

let handleGetAllCart = async(req,res)=>{
    let userId = req.query.userId
    let carts = await CartService.getAllCartData(userId)
    console.log(carts)
    return res.status(200).json(
        {
            // errCode:0,
            // errMessage:'Ok',
            carts
        })
}
let handleCreateCart = async (req, res) => {
    
  let message = await CartService.createNewCart(req.body);
  return res.status(200).json({
    message,
  });
};
let handleUpdateAmount = async (req, res) => {
  let data = req.body
  let message = await CartService.updateAmountData(data);
  return res.status(200).json(message);
};
let handleDeleteCart = async (req,res) =>
{
    if(!req.query.id)
    {
        return res.status(200).json(
            {
                errCode:1,
                errMessage: "missing parameters"
            })
    }
    let message = await CartService.deleteCart(req.query.id)
    return res.status(200).json(message)
}
module.exports = {
  handleCreateCart: handleCreateCart,
  handleUpdateAmount:handleUpdateAmount,
  handleGetAllCart:handleGetAllCart,
  handleDeleteCart:handleDeleteCart
};
