import request from "supertest";
import app from "../index.js";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import Product from "../models/productSchema.js";

let token;

beforeEach(async () => {
  const user = await User.create({
    username: "seller1",
    password: "password123"
  });

  token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
});

describe("PRODUCT ROUTES", () => {

  test("Create product", async () => {
    const res = await request(app)
      .post("/route/product")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        description: "Tasty sweet",
        price: 50,
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.product.name).toBe("Ladoo");
  });

  test("Get all products", async () => {
    await Product.create({
      name: "Barfi",
      description: "Milky sweet",
      price: 20,
      quantity: 5,
      sellerUsername: "seller1"
    });

    const res = await request(app).get("/route/product");
    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(1);
  });

});
