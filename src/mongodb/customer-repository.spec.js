const { MongoClient } = require("mongodb")
const { MongoDBContainer } = require("@testcontainers/mongodb");
const { createCustomer, getCustomers } = require("./customer-repository");



describe("Customer Repository", () => {
    jest.setTimeout(60000);

    let mongodbContainer;
    let mongoClient;
    let db;
    let collection;

    beforeAll(async () => {
        mongodbContainer = await new MongoDBContainer('mongo:6.0.3').start();
        mongoClient = new MongoClient(mongodbContainer.getConnectionString(), { directConnection: true });
        await mongoClient.connect();
        db = mongoClient.db('testdb');
        collection = db.collection('testcollection');
    });

    afterAll(async () => {
        await mongoClient.close()
        await mongodbContainer.stop();
    });

    it("should create and return multiple customers", async () => {
        const customer1 = { name: "John Doe" };
        const customer2 = { name: "Jane Doe" };

        await createCustomer(collection, customer1);
        await createCustomer(collection, customer2);

        const customers = await getCustomers(collection);
        expect(customers).toEqual([customer1, customer2]);
    });
});