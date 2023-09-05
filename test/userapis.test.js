const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const { app } = require("../server");
const UserModel = require("../app/models/userModel");

describe("User Apis Test", () => {
  let shouldDeleteUser = false;
  before(async () => {
    await UserModel.deleteMany();
  })
  beforeEach(async () => {
    if (shouldDeleteUser) {
      await UserModel.deleteMany();
    }
  });

  const testUser = {
    username: "testuser",
    fullname: "Test User",
    email: "test@example.com",
    password: "testpassword",
    isAdmin: true,
  };

  describe("POST /api/users/", async () => {
    it("should add a new user", async () => {
      const res = await request(app).post("/api/users").send(testUser);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("User is successfully registered");
    });
    it.skip('should handle unforeseen errors')
    it("should prevent the same user from registering twice", async () => {
      const res = await request(app).post("/api/users").send(testUser);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal("User already exists");
    });
  });
});

