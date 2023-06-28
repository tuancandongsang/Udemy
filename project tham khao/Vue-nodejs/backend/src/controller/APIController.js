import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  //http
  // 404 501
  // json/xml => object
  // const [rows, fields] = await pool.execute("SELECT * FROM users WHERE address > 50");
  // const [rows, fields] = await pool.execute("SELECT * FROM users limit 2, 2");
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.json({
    message: "ok",
    data: rows,
  });
};

let getPanigationData = async (req, res) => {
  let { pageNumber, pageSize } = req.body;
  const [rows, fields] = await pool.execute(
    `SELECT * FROM users limit ${pageNumber}, ${pageSize}`
  );

  return res.json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  console.log("req.body", req.body);

  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let userId = req.params.id;
  let { firstName, lastName, email, address } = req.body;
  // if (!firstName || !lastName || !email || !address) {
  //     return res.status(200).json({
  //         message: 'missing required params'
  //     })
  // }

  await pool.execute(
    `update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ${userId}`,
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute("delete from users where id = ?", [userId]);
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUsers,
  getPanigationData,
  createNewUser,
  updateUser,
  deleteUser,
};
