async function createCustomer(collection, customer) {
    await collection.insertOne(customer);
}

async function getCustomers(collection) {
    const result = await collection.find({}).toArray();
    return result;
}

module.exports = { createCustomer, getCustomers }