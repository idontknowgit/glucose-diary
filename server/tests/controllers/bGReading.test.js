const controller = require("../../controllers/bGReading");
const BGReading = require("mongoose").model("BGReading");

describe("auth controller", () => {
  const user_id = "123";
  const bgrInfo = { reading: 120 };
  let bgrDoc, req, res, next;

  beforeEach(() => {
    bgrDoc = new BGReading(bgrInfo);
    req = {
      body: bgrInfo
    };
    res = {
      json: jasmine.createSpy("json"),
      locals: {
        user: { _id: user_id }
      }
    };
    next = jasmine.createSpy("next");
  });

  describe("get", () => {
    it("gets users readings based on query parameters", async () => {
      const docs = [];
      const fromDate = new Date().toISOString();
      req.query = {
        fromDate
      };

      spyOn(BGReading, "find").and.returnValue(docs);

      await controller.get(req, res, next);

      expect(BGReading.find).toHaveBeenCalledWith({
        user_id,
        dateTaken: { $gte: new Date(fromDate) }
      });
      expect(res.json).toHaveBeenCalledWith({ data: docs });
    });
  });

  describe("create", () => {
    it("creates a new BGR", async () => {
      spyOn(BGReading, "create").and.returnValue(bgrDoc);

      await controller.create(req, res, next);

      expect(BGReading.create).toHaveBeenCalledWith({ ...req.body, user_id });
      expect(res.json).toHaveBeenCalledWith({ data: bgrDoc });
    });
  });

  describe("update", () => {
    it("updates a BGR", async () => {
      req.params = {
        user_id,
        _id: bgrDoc._id
      };

      spyOn(BGReading, "findOneAndUpdate").and.returnValue(bgrDoc);

      await controller.update(req, res, next);

      expect(BGReading.findOneAndUpdate).toHaveBeenCalledWith(
        {
          user_id,
          _id: bgrDoc._id
        },
        req.body,
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith({ data: bgrDoc });
    });
  });

  describe("delete", () => {
    it("deletes a BGR", async () => {
      req.params = {
        user_id,
        _id: bgrDoc._id
      };

      spyOn(BGReading, "findOneAndRemove").and.returnValue(bgrDoc);

      await controller.delete(req, res, next);

      expect(BGReading.findOneAndRemove).toHaveBeenCalledWith({
        user_id,
        _id: bgrDoc._id
      });
      expect(res.json).toHaveBeenCalledWith({
        data: { _id: bgrDoc._id }
      });
    });
  });
});
