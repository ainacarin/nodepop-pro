"use strict";

const mongoose = require("mongoose");
// const Tag = require("./Tag");
// const data = require('../lib/data.json');
// const tagsValues = ["work", "lifestyle", "motor", "mobile"];
const min = 0;
const max = 1;

//Schema
const advertisementSchema = mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: [true, "Advertisement name is required"],
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
    // tags: [String],
    tags: [String]
    // {
    //   type: [String],
    //   validate: {
    //     validator: async function (v) {
    //       const tagsValues = await Tag.find();
    //       const filtered = tagsValues.filter(tagValue => v.includes(tagValue.name));
    //       return filtered.length === v.length;
    //     },
    //     message: "Tags are predefinited",
    //   },
    // },
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
    console.log(filter.name);
  }

  if (queryData.sale) {
    filter.sale = queryData.sale;
  }

/*   if (queryData.min) {
    filter.price = { $gte: queryData.min };
    if (queryData.max) {
      filter.price = { $gte: queryData.min, $lte: queryData.max };
    }
  } else if (queryData.max) {
    filter.price = { $lte: queryData.max };
  } */
  if(queryData.price) {
    const prices = queryData.price.split("-");
    console.log('prices ', prices);
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

  const fields = {};

  const sort = queryData.sort;

  const query = Advertisement.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);

  //ejecuta query
  return query.exec(); //devuelve una promesa
};

//Model
const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
