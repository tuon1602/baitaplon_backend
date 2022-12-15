import { raw } from "body-parser";
import db from "../models/index";
import user from "../models/user";

let checkBookIdAndUserId = (bookIdData, userIdData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({
        where: { bookId: bookIdData, userId: userIdData },
      });
      if (cart) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewCart = (data) => {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkBookIdAndUserId(data.bookId, data.userId);
      if (check === true) {
        resolve({
          message: "failed",
        });
        return false;
      }
      await db.Cart.create({
        bookId: data.bookId,
        userId: data.userId,
        amount: data.amount,
      });
      resolve({
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCartData = (userId) => {
  return db.Cart.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.Book,
        attributes: {
          exclude: ["password", "description"],
        },
      },
    ],
    raw: false,
  });
};

let updateAmountData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "missing parameters",
        });
      }
      let cart = await db.Cart.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (cart) {
        cart.amount = data.amount;
        await cart.save();

        resolve({
          errCode: 0,
          message: "updated",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "cart not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteCart = (cartId) => {
    return new Promise(async (resolve, reject) => {
      await db.Cart.destroy({
        where: { id: cartId },
      });
      resolve({
        errCode: 0,
        message: "Cart deleted",
      });
    });
  };
  
module.exports = {
  createNewCart: createNewCart,
  updateAmountData: updateAmountData,
  getAllCartData: getAllCartData,
  deleteCart: deleteCart,
};
