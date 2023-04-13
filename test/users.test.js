const chai = require("chai");
const request = require("supertest");
let User = require("../models/users.model.js");
const app = require("../index.js");
const expect = chai.expect;
describe("User routes", () => {
  var id = "";
    const data = {
      firstName: "test",
      lastName: "tested",
      email: "test@gmail.com",
      password: "test@123",
    };

  before(async () => {
    const user = await User.create({
        ...data,
        email: "test1@gmail.com",
        
    });
    id = user._id;
  });
  after(async () => {
    await User.deleteMany({});
  });

  it("should register a user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .set("content-type", "application/json")
      .send(JSON.stringify(data));
    expect(response.status).to.equal(200 || 404 || 400);
    
  });
  
    it("should login a user", async () => {
        const loginCred = {
            email: data.email,
            password : data.password
        }
        
        const response = await request(app)
        
      .post("/api/users/login")
      .set("content-type", "application/json")
      .send(JSON.stringify(loginCred));
    expect(response.status).to.equal(200  || 404 || 400);
    
    });
  

});
