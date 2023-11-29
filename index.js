const { MongoClient } = require("mongodb");

const sourceUri = "mongodb+srv://pad:pad_laborator@lab2pad.iincdiq.mongodb.net/?retryWrites=true&w=majority";
const destinationUri = "mongodb+srv://destination:pad_destination@padestination.gqvqfyq.mongodb.net/?retryWrites=true&w=majority";
const sourceCollectionName = "course";
const destinationCollectionName = "course";

const sourceClient = new MongoClient(sourceUri);
const destinationClient = new MongoClient(destinationUri);

async function synchronizeData() {
    try {
        await sourceClient.connect();
        await destinationClient.connect();

        const sourceDatabase = sourceClient.db("Lab2PAD");
        const sourceCollection = sourceDatabase.collection(sourceCollectionName);

        const destinationDatabase = destinationClient.db("PADestination");
        const destinationCollection = destinationDatabase.collection(destinationCollectionName);

        const changeStream = sourceCollection.watch();

        changeStream.on("change", (change) => {
            if (change.operationType === "insert") {
                destinationCollection.insertOne(change.fullDocument);
            } else if (change.operationType === "update") {
                destinationCollection.updateOne(
                    { _id: change.documentKey._id },
                    { $set: change.updateDescription.updatedFields }
                );
            } else if (change.operationType === "delete") {
                destinationCollection.deleteOne({ _id: change.documentKey._id });
            }
        });

        console.log("Synchronization is listening for changes in real-time.");
    } catch (error) {
        console.error(error);
    }
}

synchronizeData();
