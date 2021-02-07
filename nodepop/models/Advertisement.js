"use strict";

const mongoose = require("mongoose");

const min = 0;
const max = 1;

//Schema
const advertisementSchema = mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: [true, "Advertisement name is required"],
      validate: {
        validator: async function (value) {
          return (value.trim());
        },
        message: "Advertisement name can´t be an empty a value",
      },
    },
    sale: {
      type: Boolean,
      index: true,
      required: [
        true,
        "Advertisement type sale is required. Sale = true, Not sale = false",
      ],
    },
    price: {
      type: Number,
      index: true,
      required: [true, "Advertisement price is required.  Format = XXXXX.XX"],
    },
    image: String,
    tags: [String]
  },
  {
    collection: "advertisements",
  }
);

advertisementSchema.statics.list = function (queryData) {
  var filter = {};

  if (queryData.tags) {
    const tags = queryData.tags.split(" ");
    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }
  }

  if (queryData.name) {
    filter.name = { $regex: "^" + queryData.name, $options: "m" };
  }

  if (queryData.sale) {
    filter.sale = queryData.sale;
  }

  if(queryData.price) {
    const prices = queryData.price.split("-");
    if(prices.length == 2) {
      if(prices[min] != '' && prices[max] != '') {
        filter.price = { $gte: prices[min], $lte: prices[max] };
      } else if(prices[min] != '') {
        filter.price = { $gte: prices[min] };
      } else {
        filter.price = { $lte: prices[max] };
      }
    } else if(prices.length == 1){
      filter.price = queryData.price;
    }
  }

  const limit = parseInt(queryData.limit);
  const skip = parseInt(queryData.skip);

  // const fields = {};

  const sort = queryData.sort;

  const query = Advertisement.find(filter);
  query.limit(limit);
  query.skip(skip);
  // query.select(fields);
  query.sort(sort);

  return query.exec();
};

//Model
const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
