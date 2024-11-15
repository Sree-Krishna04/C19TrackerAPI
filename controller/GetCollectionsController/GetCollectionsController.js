import mongoose from "mongoose";
const collectionLister = async function () {
  let collectionList = {};
  const database = mongoose.connection.useDb("Covid-Cases-List");
  const collections = await database.listCollections();
  for (const collection of collections) {
    collectionList[collection["name"]] = collection["name"];
  }
  return collectionList;
};
const getCollectionsFunction = async function (request, response) {
  try {
    const collections = await collectionLister();
    console.log(collections);
    response.status(200);
    response.json(collections);
  } catch (e) {
    response.status(500);
    response.json({ message: "Internal Server Error" });
  }
};
export default { getCollectionsFunction, collectionLister };
