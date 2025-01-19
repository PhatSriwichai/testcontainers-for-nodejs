const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', { name: String });

async function createCustomer(customer) {
    await Customer.create(customer);
}

async function getCustomers() {
    const result = await Customer.find({});
    return result;
}

module.exports = { createCustomer, getCustomers, Customer }