const userDao = require("../dao/userDao");
const util = require("../../utils/util");
class UserController {
  async login(req, res) {
    try {
      let _ = req.body;

      console.log("Ingreso con ", _.mail, _.pass);

      let result = await userDao.getLogin(_.mail, _.pass);
      // console.log("get Login: ", result);

      let idNotaria = result.rows[0].id_notaria;
      let idWhitelistNot = result.rows[0].id_whitelist_not;
      let correo = result.rows[0].correo;
      let idPermiso = result.rows[0].id_permiso;

      console.log("idPermiso: ", idPermiso);
      // id_permiso

      //
      let tokenEmail = await userDao.insertBitacora(
        idNotaria,
        idWhitelistNot,
        correo
      );
      console.log("tokenEmail - insertBitacora: ", tokenEmail);
      // console.log("tokenEmail - insertBitacora: ", tokenEmail.toString().length);

      userDao
        .getTokenEmail(tokenEmail)
        .then((resultCodEmail) => {
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataJson(
            resultCodEmail,
            "activation",
            idPermiso
          );
          // devolver permiso, en el data{}
          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          // console.log("err.message getTokenEmail => ", err);
          let statusJson = util.responseStatusJson(true, "error sign in", 404);
          let dataJson = util.responseDataJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      if (
        err.message == "Cannot read property 'id_notaria' of undefined" ||
        err.message == "Cannot read property 'id_whitelist_not' of undefined"
      ) {
        let statusJson = util.responseStatusJson(true, "error sign in", 404);
        let dataJson = util.responseDataJson(null, "again");

        res.status(404).json({
          status: statusJson,
          data: dataJson,
        });
      }

      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  async statusCodEmail(req, res) {
    try {
      userDao
        .getStatusEmail(req.headers["x-api-key"])
        .then((resultStatusCod) => {
          // console.log(
          //   "Dao setDeleteAccount Then",
          //   resultStatusCod.rows[0].status_session
          // );
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataJson(
            resultStatusCod,
            "statusSession"
          );

          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          console.log("Dao deleteAccount Catch", err);
          let statusJson = util.responseStatusJson(
            true,
            "error statusSession",
            404
          );
          let dataJson = util.responseDataJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  async getAccountsLogin(req, res) {
    try {
      let _ = req.body;

      let result = await userDao.getIdNotaria(_.token);
      let idNotariaList = result.rows[0].id_notaria;

      // console.log("getAccountsLogin entro");

      userDao
        .getAllAccounts(idNotariaList, _.correo)
        .then((resultAccounts) => {
          // console.log("Dao getAllAccounts Then", resultAccounts);
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataListJson(resultAccounts, "list");

          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          console.log("Dao getAllAccounts Catch", err);
          let statusJson = util.responseStatusJson(true, "error list", 404);
          let dataJson = util.responseDataListJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      if (err.message == "Cannot read property 'accountDelete' of undefined") {
        let statusJson = util.responseStatusJson(true, "error list", 404);
        let dataJson = util.responseDataListJson(null, "again");

        res.status(404).json({
          status: statusJson,
          data: dataJson,
        });
      }

      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  async registerAccount(req, res) {
    try {
      let _ = req.body;
      console.log("======");
      //
      console.log("======key");
      console.log(req.headers["x-api-key"]);
      console.log("======key");

      // console.log("Antes de get IdNotaria: ");
      let result = await userDao.getIdNotariaPermiso(req.headers["x-api-key"]);
      let idNotariaDone = result.rows[0].id_notaria;
      let idPermiso = result.rows[0].id_permiso;
      console.log("Result get IdNotaria ", idNotariaDone);
      console.log("Result get idPermiso ", idPermiso);

      userDao
        .setRegisterAccount(
          idNotariaDone,
          _.mail,
          _.password,
          _.name,
          _.permiso,
          idPermiso
        )
        .then((resultInsert) => {
          console.log("Controller setRegisterAccount Then");
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataJson(null, "registered");

          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          console.log("Controller setRegisterAccount Catch", err);

          let statusJson = util.responseStatusJson(true, "error register", 404);
          let dataJson = util.responseDataJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      if (err.message == "Cannot read property 'id_notaria' of undefined") {
        let statusJson = util.responseStatusJson(true, "error register", 404);
        let dataJson = util.responseDataJson(null, "again");

        res.status(404).json({
          status: statusJson,
          data: dataJson,
        });
      }

      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  async deleteAccount(req, res) {
    try {
      let result = await userDao.getIdNotariaPermiso(req.headers["x-api-key"]);
      let idNotariaDelete = result.rows[0].id_notaria;
      let idPermiso = result.rows[0].id_permiso;

      let mailD = await userDao.getPermisoCorreo(_.mailDelete);
      let permisoDelete = mailD.rows[0].id_permiso;

      userDao
        .setDeleteAccount(
          _.mailDelete,
          idNotariaDelete,
          permisoDelete,
          idPermiso
        )
        .then((resultDelete) => {
          console.log("Dao setDeleteAccount Then");
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataJson(null, "deleted");

          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          console.log("Dao deleteAccount Catch", err);
          let statusJson = util.responseStatusJson(true, "error delete", 404);
          let dataJson = util.responseDataJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      if (err.message == "Cannot read property 'accountDelete' of undefined") {
        let statusJson = util.responseStatusJson(true, "error delete", 404);
        let dataJson = util.responseDataJson(null, "again");

        res.status(404).json({
          status: statusJson,
          data: dataJson,
        });
      }

      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  async listPermisos(req, res) {
    try {
      userDao
        .getListPermisos(req.headers["x-api-key"])
        .then((resultListP) => {
          console.log("Dao getListPermisos Then", resultListP.row);
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataListJson(resultListP, "listPermisos");
          // let dataJson = util.responseDataJson(null, "listPermisos");

          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          console.log("Dao getListPermisos Catch", err);
          let statusJson = util.responseStatusJson(
            true,
            "error listPermisos",
            404
          );
          let dataJson = util.responseDataJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  async logout(req, res) {
    try {
      userDao
        .setLogoutAccount(req.headers["x-api-key"])
        .then((resultDelete) => {
          console.log("Dao setLogoutAccount Then");
          let statusJson = util.responseStatusJson(false, "succesfully", 200);
          let dataJson = util.responseDataJson(null, "logout");

          res.status(200).json({
            status: statusJson,
            data: dataJson,
          });
        })
        .catch((err) => {
          console.log("Dao setLogoutAccount Catch", err);
          let statusJson = util.responseStatusJson(true, "error delete", 404);
          let dataJson = util.responseDataJson(null, "again");

          res.status(404).json({
            status: statusJson,
            data: dataJson,
          });
        });
    } catch (err) {
      let statusJson = util.responseStatusJson(
        true,
        "internal server error",
        500
      );
      let dataJson = util.responseDataJson(null, "mainteance");

      res.status(500).json({
        status: statusJson,
        data: dataJson,
      });
    }
  }

  userLogin(req, res) {
    let _ = req.body;

    const id = req.params.id;

    userDao
      .getLoginById(id)
      .then((data) => {
        var response = {};
        // response.data = data.rows;
        // response.data = data.rows[0].id;

        response = data.rows;
        res.status(202).json({
          status: true,
          err: null,
          data: response,
        });
      })
      .catch((err) => {
        if (err.message == "Cannot read property 'id' of undefined") {
          res.status(404).json({
            status: false,
            err: "mail and password not found!!",
          });
        }
        res.status(500).json({
          status: false,
          err: err.message,
        });
      });
  }

  validationUser(id) {
    userDao
      .getValidation(id)
      .then((data) => {
        return true;
      })
      .catch((err) => {
        if (err.message == "Cannot read property 'id' of undefined") {
          res.status(404).json({
            status: false,
            err: "mail and password not found!!",
          });
        }
        res.status(500).json({
          status: false,
          err: err.message,
        });
      });
  }
}

module.exports = new UserController();
