const db = require("../../database/postgresdb");
const util = require("../../utils/util");

class UserDao {
  getLogin(mail, password) {
    console.log(mail, password);
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select n.id_notaria as id_notaria, wn.id_notaria as id_whitelist_not
                      , wn.correo as correo, wn.id_permiso as id_permiso
                      from whilelist_notarias as wn
                      inner join notarias as n
                      on wn.id_notaria = n.id_notaria
                      where correo = $1 and password = $2;`;
        let params = [mail, password];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  insertBitacora(idNotaria, idWhitelistNot, correo) {
    console.log("InsertBitacora :", idNotaria, idWhitelistNot);
    return new Promise(async (resolve, reject) => {
      try {
        let tokenEmail = util.tokenEmail();
        let tokenUuid = util.generateToken();
        let statusSession = true;
        // let timeStamp = util.timeStamp();

        let query = `insert into
        bitacora(id_notaria, id_whitelist_not, cod_email, status_session, token, correo)
                    values($1, $2, $3, $4, $5, $6);`;
        let params = [
          idNotaria,
          idWhitelistNot,
          tokenEmail,
          statusSession,
          tokenUuid,
          correo,
        ];
        let result = await db.query(query, params);

        resolve(tokenEmail);
      } catch (e) {
        reject(e);
      }
    });
  }

  getTokenEmail(tokenEmail) {
    console.log("getTokenEmail: ", tokenEmail);
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select cod_email from bitacora where cod_email = $1 limit 1;`;
        let params = [tokenEmail];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  getStatusEmail(codEmail) {
    console.log("codEmail: ", codEmail);
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select status_session from bitacora where cod_email = $1 limit 1;`;
        let params = [codEmail];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  getIdNotariaPermiso(tokenEmail) {
    console.log("getIdNotaria DAO");
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select b.id_notaria, wn.id_permiso from bitacora b
                     inner join whilelist_notarias wn
                     on b.correo = wn.correo
                     where b.cod_email=$1;`;
        let params = [tokenEmail];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllAccounts(idNotariaList, excludeAccount) {
    console.log(" getAllAccounts ");
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select name, id_permiso, correo from whilelist_notarias
                     where id_notaria = $1 and correo <> $2
                     and  baja_logica = false limit 200;`;
        let params = [idNotariaList, excludeAccount];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  setRegisterAccount(idNotariaDone, mail, password, name, permiso, idPermiso) {
    console.log("setRegisterAccount into Dao");
    return new Promise(async (resolve, reject) => {
      try {
        let arrayData = [1, 2, 3];
        console.log("permiso -- ", permiso);
        console.log("idPermiso -- ", idPermiso);

        for (let i = idPermiso; i < arrayData.length; i++) {
          const permisoCreateUser = arrayData[i];
          if (permisoCreateUser == permiso) {
            // console.log("permiso if", permiso);
            let query = `INSERT INTO whilelist_notarias ( id_notaria, correo, password, name, id_permiso)
            VALUES ( $1, $2, $3, $4, $5);`;
            let params = [idNotariaDone, mail, password, name, permiso];
            let result = await db.query(query, params);

            resolve(result);
          }
        }
        // console.log("reject -- true");
        reject();
      } catch (e) {
        reject(e);
      }
    });
  }

  setDeleteAccount(accountDelete, idNotariaDelete, permiso, idPermiso) {
    console.log("setDeleteAccount into Dao");
    return new Promise(async (resolve, reject) => {
      try {
        let arrayData = [1, 2, 3];

        for (let i = idPermiso; i < arrayData.length; i++) {
          const permisoCreateUser = arrayData[i];
          if (permisoCreateUser == permiso) {
            // console.log("permiso if", permiso);
            let query = `UPDATE whilelist_notarias SET baja_logica = true
                         WHERE correo = $1 and id_notaria = $2;`;
            let params = [accountDelete, idNotariaDelete];
            let result = await db.query(query, params);

            resolve(result);
          }
        }

        console.log("reject -- true");
        reject();
      } catch (e) {
        reject(e);
      }
    });
  }

  getListPermisos(tokenUser) {
    console.log("getListPermisos into Dao");
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select p.id_permisos as id,
                        p.description as descripcion
                      from bitacora b
                        inner join whilelist_notarias wn on b.correo = wn.correo
                        inner join permisos p on wn.id_permiso < p.id_permisos
                      where b.cod_email = $1;`;
        let params = [tokenUser];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  // setLastConexion(tokenUser) {
  //   console.log("setLastConexion into Dao");
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let timeStamp = util.timeStamp();

  //       let query = `UPDATE bitacora SET ultima_conexion = $1
  //                    WHERE cod_email = $2;`;
  //       let params = [timeStamp, tokenUser];
  //       let result = await db.query(query, params);

  //       resolve(result);
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }

  setLogoutAccount(tokenUser) {
    console.log("setLogoutAccount into Dao");
    return new Promise(async (resolve, reject) => {
      try {
        let timeStamp = util.timeStamp();

        let query = `UPDATE bitacora SET ultima_conexion = $1,
                                         status_session = false
                     WHERE cod_email = $2;`;
        let params = [timeStamp, tokenUser];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  getPermisoCorreo(correo) {
    console.log("getPermisoCorreo into Dao");
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select id_permiso from whilelist_notarias
        where correo = $1;`;
        let params = [correo];

        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  getLoginById(id) {
    console.log("getloginby id ", id);
    return new Promise(async (resolve, reject) => {
      try {
        let query = `select id, correo from whitelist_notarias where id = $1 limit 1;`;
        let params = [id];
        let result = await db.query(query, params);

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = new UserDao();

// setRegisterAccount(idNotariaDone, email, password, name, permiso) {
//   console.log("setRegisterAccount into Dao");
//   return new Promise(async (resolve, reject) => {
//     try {
//       let query = `INSERT INTO whilelist_notarias ( id_notaria, correo, password, name, id_permiso)
//                    VALUES ( $1, $2, $3, $4, $5);`;
//       let params = [idNotariaDone, email, password, name, permiso];

//       let result = await db.query(query, params);

//       resolve(result);
//     } catch (e) {
//       reject(e);
//     }
//   });
// }
