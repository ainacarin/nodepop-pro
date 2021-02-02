"use strict";

const mongoose = require("mongoose");

//Schema
const advertisementSchema = mongoose.Schema(
  {
    name: { type: String, index: true },
    sale: { type: Boolean, index: true },
    price: { type: Number, index: true },
    image: String,
    tags: [String],
  },
  {
    collection: "advertisements",
  }
);

advertisementSchema.statics.list = function (queryData) {
  const filter = {};

  if (queryData.tags) {
    const tags = queryData.tags.split(" ");
    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }
  }

  if(queryData.name) {
    console.log("NAme", queryData.name);
      filter.name = { $regex: "^"+queryData.name, $options: 'm' };
      console.log(filter.name)
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
