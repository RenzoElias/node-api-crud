const User = require("../dao/test");
const util = require("../../utils/util");

class UserController {
  async getUsers(req, res) {
    try {
      let result = await User.getUsers();

      if (result != null) {
        // res.status(200).json(response.rows);
        res.send({
          success: true,
          message: "succesfully!!",
          data: result.rows,
        });
      } else {
        res.send({ success: false, message: "Bad request !!" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(req, res) {
    try {
      let _ = req.body;
      const id = req.params.id;
      let result = await User.getUserById(id);

      if (result != null) {
        res.send({
          success: true,
          message: "succesfully!!",
          data: result.rows,
        });
      } else {
        res.send({ success: false, message: "Bad request !!" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(req, res) {
    try {
      let _ = req.body;
      // let token = util.generateToken();
      let result = await User.createUser(_.name, _.email);

      if (result != null) {
        res.send({ success: true, message: "user created!!" });
      } else {
        res.send({ success: false, message: "Bad request !!" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// module.exports = new UserController();
