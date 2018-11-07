const jwt = require("jsonwebtoken");

const { requireAuth, ensureCorrectUser } = require("../../middleware/auth");
const User = require("mongoose").model("User");

describe("auth middlware", () => {
  const userDoc = { _id: "132" };

  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: `Bearer ${jwt.sign(userDoc, process.env.JWT_SECRET)}`
      },
      params: {}
    };
    res = {
      locals: {}
    };
    next = jasmine.createSpy("next");
  });

  describe("requireAuth", () => {
    it("checks validity of token & passes user doc in res.locals", async () => {
      spyOn(jwt, "verify").and.callThrough();
      spyOn(User, "findById").and.returnValue(userDoc);

      await requireAuth(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      expect(User.findById).toHaveBeenCalledWith(userDoc._id);
      expect(res.locals.user).toEqual(userDoc);
    });

    it("it rejects invalid token", async () => {
      req.headers.authorization = "fake-token";

      await requireAuth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("ensureCorrectUser", () => {
    it("allows req to go on to the next middleware when users id == req.params.user_id ", async () => {
      req.params.user_id = userDoc._id;
      res.locals.user = userDoc;

      await ensureCorrectUser(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });

    it("halts the request when users id !== req.params.user_id ", async () => {
      req.params.user_id = userDoc._id;
      res.locals.user = { _id: "wrong" };

      await ensureCorrectUser(req, res, next);

      expect(next.calls.mostRecent().args[0].statusCode).toEqual(401);
    });
  });
});
