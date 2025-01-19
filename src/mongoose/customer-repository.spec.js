const mongoose = require('mongoose');
const { MongoDBContainer } = require("@testcontainers/mongodb");
const { createCustomer, getCustomers } = require("./customer-repository");


describe("Customer Repository", () => {
    jest.setTimeout(60000);

    let mongodbContainer;
    let mongoClient;

    beforeAll(async () => {
        mongodbContainer = await new MongoDBContainer('mongo:6.0.3').start();
        await mongoose.connect(`${mongodbContainer.getConnectionString()}/testDB`, { directConnection: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongodbContainer.stop();
    });

    it("should create and return multiple customers", async () => {
        const customer1 = { name: "John Doe" };
        const customer2 = { name: "Jane Doe 2" };

        await createCustomer(customer1);
        await createCustomer(customer2);

        const customers = await getCustomers();
        expect(customers.map(item => ({ name: item.name }))).toEqual([customer1, customer2]);
    });
});