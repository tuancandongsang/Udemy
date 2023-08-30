import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  const { keyword, limit, pageNumber, userid } = req.query;
  // console.log('page', req.query.pageNumber , keyword , limit, pageNumber, userid);
  const startNumber = (pageNumber - 1) * limit;

  let sqlQuery = `
    SELECT authen.*, users.*
    FROM authen
    INNER JOIN users ON authen.id = users.userid
    WHERE authen.id = ?`;
  const queryParams = [userid];

  if (keyword) {
    sqlQuery += ` AND users.firstName LIKE ?`;
    queryParams.push(`%${keyword}%`);
  }

  if (limit && pageNumber) {
    sqlQuery += ` LIMIT ?, ?`;
    queryParams.push(startNumber, limit);
  }

  try {
    const [rows, fields] = await pool.execute(sqlQuery, queryParams);
    const [BinaryRow] = await pool.execute(
      `SELECT COUNT(*) as totalCount FROM users WHERE userid = ?`,
      [userid]
    );

    return res.json({
      message: "ok",
      data: rows,
      totalItems: BinaryRow[0]?.totalCount,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address, userid } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "Missing required information",
    });
  }

  await pool.execute(
    "insert into users(firstName, lastName, email, address, userid) values (?, ?, ?, ?, ?)",
    [firstName, lastName, email, address, userid]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let userId = req.params.id;
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "Missing required information",
    });
  }

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
let createDescription = async (req, res) => {
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
