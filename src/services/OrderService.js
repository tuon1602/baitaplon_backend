import db from "../models/index";

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.create({
        userId: data.userId,
        bookId: data.bookId,
        amount: data.amount,
        type: data.type,
      });
      resolve({
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllOrderData = (userId) => {
  return db.Order.findAll({
    where: { userId: userId },
    raw: false,
  });
};
let getAllBookDataByOrderId = async (orderId, bookId) => {
  var bookData = []
  let data = await db.Order.findOne({
    where: { id: orderId },
    attributes: {
      exclude: [],
    },
  });
  var array = JSON.parse("[" + data.bookId + "]");
  // console.log(array)
  // array.forEach(async(data)=>{
  //   bookData = await db.Book.findOne({
  //     where:{id:data},
  //     attributes:{
  //       exclude:["image"]
  //     }
  //   })
  //   console.log(bookData)
  // })
  for(let element=0;element<array.length;element++){
    var arrayData = await db.Book.findOne({
      where:{id:array[element]},
      attributes:{
        exclude:["description"]
      }
    })
    bookData.push(arrayData)
  }
  // console.log(bookData)
  return(bookData)

  // let bookData = await db.Book.findAll({
  //   where:{id:},
  //   attributes:{
  //     exclude:["image"]
  //   }
  // })
};
//fix this
let deleteAllCartsWhenNavigate = (userId, dataId) => {
  // console.log(dataId)
  return new Promise(async (resolve, reject) => {
    try {
      var arrayData = dataId.split(',').map(Number)
      // console.log(arrayData)
      for(let element=0;element<arrayData.length;element++){
        await db.Cart.destroy({
          where: { userId: userId, id: arrayData[element] },
        });
        resolve({
          message: "Carts deleted",
        });
      }
      // console.log(arrayData)
    } catch (e) {
      reject(e);
    }
  });
};
let updateStatus = (data)=>{
  return new Promise(async(resolve,reject)=>{
    try{
      let order = await db.Order.findOne({
        where:{id:data.id},
        raw:false
      })
      if(order){
        order.type = data.type
        await order.save();
        resolve({
          message:"Updated"
        })
      }
    }
    catch(e){
      reject(e)
    }
  })
}
module.exports = {
  createOrder: createOrder,
  getAllOrderData: getAllOrderData,
  deleteAllCartsWhenNavigate: deleteAllCartsWhenNavigate,
  getAllBookDataByOrderId: getAllBookDataByOrderId,
  updateStatus:updateStatus
};
