import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  //http
  // 404 501
  // json/xml => object
  // const [rows, fields] = await pool.execute("SELECT * FROM users WHERE address > 50");
  // const [rows, fields] = await pool.execute("SELECT * FROM users limit 2, 2");
  const { keyword, limit, page } = req.query;
  const startNumber = (page - 1) * limit;
  let sqlQuery = "SELECT * FROM users";
  if (keyword) {
    sqlQuery += ` WHERE email LIKE '%${keyword}%'`;
  }
  if (limit) {
    sqlQuery += ` LIMIT ${startNumber}, ${limit}`;
  }
  const [rows, fields] = await pool.execute(sqlQuery);
  const [BinaryRow] = await pool.execute("SELECT COUNT (*) FROM users");

  return res.json({
    message: "ok",
    data: rows,
    totalItems: BinaryRow,
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
// INSERT INTO `description` (`description`) VALUES ('tuacandongsang');
let createDescription = async (req, res) => {
  // console.log("req", req.body);
  const { description } = req.body;
  await pool.execute(`update description set description= ? where 1`, [
    description,
  ]);
  return res.status(200).json({
    message: "ok",
  });
};
let getDescription = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `description` WHERE 1"
  );
  return res.json({
    message: "ok",
    data: rows,
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getDescription,
  createDescription,
};
