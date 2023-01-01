const http = require("http");

exports.getJobList = (request, response) => {
  try {
    const location = request.query.location ? request.query.location : "";
    const description = request.query.description
      ? request.query.description
      : "";
    const full_time = request.query.full_time ? request.query.full_time : false;
    const page = request.query.page ? request.query.page : "";
    const options = {
      hostname: "dev3.dansmultipro.co.id",
      port: 80,
      path:
        "/api/recruitment/positions.json?location=" +
        `${location}` +
        "&description=" +
        `${description}` +
        "&full_time=" +
        `${full_time}` +
        "&page=" +
        `${page}`,
      method: "GET",
      json: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = "";
    const req = http.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          let json = JSON.parse(body);
          if(json.status === 500) {
            json = []
          } 
          response.status(200).send({
            returnValue: 200,
            message: "Success",
            object: json,
          });
        } catch (error) {
          console.error(error.message);
        }
      });
    });
    req.on("error", (error) => {
      response.status(500).send({ message: error.message });
    });
    req.end();
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

exports.getDetailJob = (request, response) => {
  try {
    const id = request.params.id;
    const options = {
      hostname: "dev3.dansmultipro.co.id",
      port: 80,
      path: "/api/recruitment/positions/" + id,
      method: "GET",
      json: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = "";
    const req = http.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          response.status(200).send({
            returnValue: 200,
            message: "Success",
            object: JSON.parse(body),
          });
        } catch (error) {
          console.error(error.message);
        }
      });
    });
    req.on("error", (error) => {
      response.status(500).send({ message: error.message });
    });
    req.end();
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};
