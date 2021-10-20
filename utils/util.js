const uuid = require("uuid");
const base62 = require("base62");

module.exports = {
  generateToken: function () {
    return uuid.v4();
  },
  base62Encode: function (x) {
    return base62.encode(x);
  },
  base62Decode: function (x) {
    return base62.Decode(x);
  },
  tokenEmail: function () {
    return Math.round(Math.random() * (99999999 - 10000000) + 10000000);
  },
  timeStamp: function () {
    return new Date().toISOString();
  },
  responseStatusJson: function (error, message, code) {
    var status = {};
    status.error = error;
    status.message = message;
    status.code = code;

    return status;
  },
  responseDataJson: function (resultCodEmail, page, idPermiso) {
    var data = {};
    if (resultCodEmail != null) {
      console.log("no es null");
      console.log("idPermiso: data = ", idPermiso);
      if (typeof resultCodEmail.rows[0].status_session === "boolean") {
        data.statusCodEmail = resultCodEmail.rows[0].status_session;
        console.log("OK");
      } else {
        data.token = resultCodEmail.rows[0].cod_email.toString();
        data.permiso = idPermiso;
      }
    }
    data.page = page;

    return data;
  },
  responseDataListJson: function (resultAccounts, page) {
    var data = {};
    if (resultAccounts != null) {
      console.log("no es null");
      data.list = resultAccounts.rows;
    }
    data.page = page;

    return data;
  },
};
