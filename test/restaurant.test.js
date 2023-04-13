const chai = require("chai");
const request = require("supertest");
let Restaurant = require("../models/restaurant.model.js");
const app = require("../index.js");
const expect = chai.expect;
describe("Restaurant User routes", () => {
  var id = "";
  const data = {
    name: "test",
    restaurantName: "tested",
    email: "test@gmail.com",
    password: "test@123",
  };

  before(async () => {
    const restaurant = await Restaurant.create({
      ...data,
      email: "test1@gmail.com",
    });
    id = restaurant._id;
  });
  after(async () => {
    await Restaurant.deleteMany({});
  });

  it("should register a user", async () => {
    const response = await request(app)
      .post("/api/restaurantUser/register")
      .set("content-type", "application/json")
      .send(JSON.stringify(data));
    expect(response.status).to.equal(200 || 404 || 400);
  });

  it("should login a user", async () => {
    const loginCred = {
      email: data.email,
      password: data.password,
    };

    const response = await request(app)
      .post("/api/restaurantUser/login")
      .set("content-type", "application/json")
      .send(JSON.stringify(loginCred));
    expect(response.status).to.equal(200 || 404 || 400);
  });

});
