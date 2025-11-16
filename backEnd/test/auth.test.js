import request from "supertest";
import app from "../index.js";
import User from "../models/userSchema.js";

describe("AUTH ROUTES", () => {

  test("Signup → should create user", async () => {
    const res = await request(app)
      .post("/route/auth/signup")
      .send({
        username: "john",
        password: "secret123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe("john");

    const user = await User.findOne({ username: "john" });
    expect(user).not.toBeNull();
  });

  test("Signup → reject duplicate username", async () => {
    await User.create({ username: "same", password: "pass123" });

    const res = await request(app)
      .post("/route/auth/signup")
      .send({
        username: "same",
        password: "pass123"
      });

    expect(res.statusCode).toBe(400);
  });

  test("Login → works with correct credentials", async () => {
    await request(app)
      .post("/route/auth/signup")
      .send({ username: "alice", password: "mypassword" });

    const res = await request(app)
      .post("/route/auth/login")
      .send({ username: "alice", password: "mypassword" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe("alice");
    expect(res.body.token).toBeDefined();
  });

});
