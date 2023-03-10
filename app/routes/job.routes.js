const controller = require("../controllers/job.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/job/list", [authJwt.verifyToken], controller.getJobList);
  app.get("/api/job/:id", [authJwt.verifyToken], controller.getDetailJob);
};
