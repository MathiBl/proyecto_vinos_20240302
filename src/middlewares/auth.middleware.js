const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const isAuth = (request, response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.json({
      status: 401,
      message: HTTPSTATUSCODE[401],
      data: null,
    });
  }

  const splits = authorization.split(" ");
  if (splits.length != 2 || splits[0] != "Bearer") {
    return response.json({
      status: 400,
      message: HTTPSTATUSCODE[400],
      data: null,
    });
  }

  const jwtString = splits[1];

  try {
    var token = jwt.verify(jwtString, request.app.get("secretKey"));
  } catch (error) {
    return next(error);
  }

  const authority = {
    id: token.id,
    name: token.name,
  };
  request.authority = authority;
  next();
};

module.exports = {
  isAuth,
};
