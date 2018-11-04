const request = require("supertest");

const { app } = require("../../../index");
const User = require("mongoose").model("User");

describe("auth routes", () => {
  const newUserCredentials = { email: "test2@test.com", password: "123456" };
  let newUser;

  describe("register", () => {
    const endpoint = "/api/auth/register";

    it("hashes password + saves a new user in db + responds with an auth token", async () => {
      const response = await request(app)
        .post(endpoint)
        .send(newUserCredentials)
        .expect(200);
      const { data } = response.body;
      newUser = await User.findOne({ email: newUserCredentials.email });

      expect(newUser._id.toString()).toEqual(data._id);
      expect(newUser.password).not.toEqual(newUserCredentials.password);
      expect(data.token).toBeTruthy();
    });

    it("responds with error when email is in use", async () => {
      const response = await request(app)
        .post(endpoint)
        .send(newUserCredentials)
        .expect(403);

      expect(
        await User.countDocuments({ email: newUserCredentials.email })
      ).toEqual(1);
    });
  });

  describe("login", () => {
    const endpoint = "/api/auth";

    it("responds with token and user info on successful login", async () => {
      const response = await request(app)
        .post(endpoint)
        .send(newUserCredentials)
        .expect(200);
      const { data } = response.body;

      expect(data.token).toBeTruthy();
    });

    it("responds with error when user logs in with bad credentials", async () => {
      const response = await request(app)
        .post(endpoint)
        .send({ ...newUserCredentials, password: "wrongpassword" })
        .expect(401);
    });
  });

  describe("refresh session", () => {
    const endpoint = "/api/auth";

    it("responds with user data & a new token when supplied with a valid token", async () => {
      const response = await request(app)
        .get(endpoint)
        .set("Authorization", `Bearer ${newUser.generateToken()}`)
        .expect(200);
      const { data } = response.body;

      expect(data.token).toBeTruthy();
    });
  });
});
