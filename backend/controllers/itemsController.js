const Item = require("../models/itemModel");
const ErrorHandler = require("../utils/errorhandler");
const Student = require("../models/studentModel")
const catchAsyncErrors = require("../middleware/catchAE");
const ApiFeatures = require("../utils/apiFeatures");

//Create Item --Owner Access

exports.createItem = catchAsyncErrors(async (req, res, next) => {

  const {
    name,
    description,
    price,
    category,
    type,
    availability,
    image

  } = req.body

  const item = await Item.create({
    name,
    description,
    price,
    category,
    type,
    availability,
    image,
    collegeCanteen: req.owner.ownerCollegeName,
  });

  res.status(201).json({
    success: true,
    item,
  });
});

// Get all Item --Student || --Owner

exports.getAllItems = catchAsyncErrors(async (req, res, next) => {
  
  const resultPerPage = 20;
  const itemsCount = await Item.countDocuments();

  const apiFeatures = new ApiFeatures(Item.find({availability:true, collegeCanteen: req.params.collegeCanteen }), req.query).search().filter();

  let items = await apiFeatures.query;

  let filteredItemsCount = items.length;

  apiFeatures.pagination(resultPerPage);

  items = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    items,
    itemsCount,
    resultPerPage,
    filteredItemsCount,
  });
});

// Get Item Details

exports.getItemDetails = catchAsyncErrors(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not Found", 404));
  }

  res.status(200).json({
    success: true,
    item,
  });
});

// Update Items  --Owner access

exports.updateItem = catchAsyncErrors(async (req, res, next) => {
  let item = Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not Found", 404));
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

// Delete Item --Owner Access

exports.deleteItem = catchAsyncErrors(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not Found", 404));
  }

  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
});

// get all Items --admin

exports.getAdminItems = catchAsyncErrors(async (req, res, next) => {
  
  const itemsCount = await Item.countDocuments();

  let items = await Item.find()

  res.status(200).json({
    success: true,
    itemsCount,
    items,
  });
});

// Create new Review / Update Review

exports.createItemReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, itemId } = req.body;

  const review = {
    student: req.student._id,
    name: req.student.name,
    rating: Number(rating),
    comment,
    dateAt: Date.now(),
  };

  const item = await Item.findById(itemId);

  const isReviewed = item.reviews.find(
    (rev) => rev.student.toString() === req.student._id.toString()
  );

  if (isReviewed) {
    item.reviews.forEach((rev) => {
      if (rev.student.toString() === req.student._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    item.reviews.push(review);
    item.numOfReviews = item.reviews.length;
  }

  let avg = 0;
  item.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  item.rating = avg / item.reviews.length;

  await item.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a item

exports.getItemReviews = catchAsyncErrors(async (req, res, next) => {
  const item = await Item.findById(req.query.id);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: item.reviews,
  });
});

// Delete Reviews

exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const item = await Item.findById(req.query.itemId);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  const reviews = item.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  await Item.findByIdAndUpdate(
    req.query.itemId,
    {
      numOfReviews: reviews.length,
      rating,
      reviews,
    },
    {
      new: true,
      runValidators: true,
      useFindandModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
