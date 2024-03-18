const Order = require("../models/orderModel");
const Owner = require("../models/ownerModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderItems, paymentId, totalPrice } = req.body;

  const order = await Order.create({
    orderItems,
    paymentId,
    totalPrice,
    paidAt: Date.now(),
    student: req.student._id,
    canteen: req.student.collegeCanteen,
  });

  res.status(201).json({
    sucess: true,
    order,
  });
});

// Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "student",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    sucess: true,
    order,
  });
});

// Get Loggedin User Orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ student: req.student._id });

  res.status(200).json({
    sucess: true,
    orders,
  });
});

// Get All Orders --owner

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const owner = await Owner.findById(req.params.id);

  const orders = await Order.find({ canteen: owner.ownerCollegeName });

  let totalAmount = 0;

  let totalOrders = orders.length;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    sucess: true,
    totalAmount,
    totalOrders,
    orders,
  });
});

// Get All Orders --admin

exports.getAdminOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  let totalOrder = orders.length;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    sucess: true,
    totalAmount,
    totalOrder,
    orders,
  });
});

// Update Order Status --owner

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (order.orderStatus === "Served") {
    return next(new ErrorHandler("You have already served this order", 400));
  }

  order.orderStatus = req.body.orderStatus;

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    sucess: true,
    order,
  });
});

// Delete order --Owner

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    sucess: true,
  });
});
