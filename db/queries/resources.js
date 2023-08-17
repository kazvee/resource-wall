const db = require('../connection');

const getResources = () => {
  const resources = db.query('SELECT * FROM resources;');
  return resources
    .then(data => {
      return data.rows;
    });
};

const addResource = (resource) => {
  const { user_id, title, description, category_id, resource_url, thumbnail_url } = resource;
  // Add RETURNING *; to the end of an INSERT query to return the objects that were inserted. This is handy when you need the auto generated id of an object you've just added to the database
  return db.query('INSERT INTO resources (user_id, title, description, category_id, resource_url, thumbnail_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
    [user_id, title, description, category_id, resource_url, thumbnail_url])
    .then(data => {
      console.log("Data", data);
      return data.rows[0];
    });
};

const searchResource = (searchText) => {
  return db.query(`
  SELECT *
  FROM resources
  WHERE title ILIKE $1;`, [`%${searchText}%`])
    .then((result) => {
      console.log(("This is the search", result));
      return result.rows;
    });
};


module.exports = { getResources, addResource, searchResource };
