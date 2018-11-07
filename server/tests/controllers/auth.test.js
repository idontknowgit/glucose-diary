const controller = require("../../controllers/auth");
const User = require("mongoose").model("User");

describe("auth controller", () => {
  const userInfo = { email: "test@test.com", password: "123456" };
  let userDoc, req, res, next;

  beforeEach(() => {
    userDoc = new User(userInfo);
    req = { body: userInfo };
    res = {
      json: jasmine.createSpy("json")
    };
    next = jasmine.createSpy("next");
  });

  describe("register", () => {
    it("handles successful registration", async () => {
      spyOn(User, "countDocuments").and.returnValue(0);
      spyOn(User, "create").and.returnValue(userDoc);

      await controller.register(req, res, next);

      expect(User.countDocuments).toHaveBeenCalledWith({
        email: new RegExp(`^${userInfo.email}$`, "i")
      });
      expect(User.create).toHaveBeenCalledWith(userInfo);
      expect(res.json).toHaveBeenCalledWith({ data: userDoc.toAuthJSON() });
    });

    it("doesnt create a user when email already exists", async () => {
      spyOn(User, "countDocuments").and.returnValue(1);

      await controller.register(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("handles successful login", async () => {
      spyOn(User, "findOne").and.returnValue(userDoc);
      spyOn(User.prototype, "isCorrectPassword").and.returnValue(true);

      await controller.login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        email: new RegExp(`^${userInfo.email}$`, "i")
      });
      expect(User.prototype.isCorrectPassword).toHaveBeenCalledWith(
        userInfo.password
      );
      expect(res.json).toHaveBeenCalledWith({ data: userDoc.toAuthJSON() });
    });

    it("handles wrong password", async () => {
      spyOn(User, "findOne").and.returnValue(userDoc);
      spyOn(User.prototype, "isCorrectPassword").and.returnValue(false);

      await controller.login(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("refreshSession", () => {
    it("sends user their data and new token", async () => {
      res.locals = { user: userDoc };

      await controller.refreshSession(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ data: userDoc.toAuthJSON() });
    });
  });
});
