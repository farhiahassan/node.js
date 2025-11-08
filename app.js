const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    //mongo connect
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("universityDB");
    const students = db.collection("students");

    const result = await students.insertOne({
      name: "aisha",
      age: 25,
      department: "engenering",
      year: 3
    });
    console.log("Inserted with _id:", result.insertedId);


    // InsertMany
const insertMany = await students.insertMany([
  { name: "sucdi", age: 19, department: "CS", year: 3 },
  { name: "Hamda", age: 22, department: "acounting", year: 4 },
  { name: "ahmed", age: 20, department: "education", year: 5 }
]);
console.log("Inserted Many count:", insertMany.insertedCount);


// Findall
const allStudents = await students.find().toArray();
console.log("All Students:", allStudents);

// Find specific one
const projection = await students
  .find({}, { projection: { name: 1, department: 1, _id: 0 } })
  .toArray();
console.log("Names + Departments:", projection);

// Update One
const updateOne = await students.updateOne(
  { name: "Hassan" },
  { $set: { name: "muno" } }
);
console.log("Updated One:", updateOne.modifiedCount);

//new fild add
const newFieldAdd = await students.updateMany(
      {},
      { $set: { status: "active" } }
    );
    console.log("Added new field to all documents:", newFieldAdd.modifiedCount);


// Update Many
const updateMany = await students.updateMany(
  { year: 2 },
  { $set: { status: "" } }
);
console.log("Updated Many:", updateMany.modifiedCount);


// Delete Many
const deleteMany = await students.deleteMany({ department: "acounting", });
console.log("Deleted Many:", deleteMany.deletedCount);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}
run();