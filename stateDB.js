var AWS = require('aws-sdk');
require('dotenv').config();
let awsConfig = {
  region: 'us-east-2',
  endpoint: 'http://dynamodb.us-east-2.amazonaws.com',
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_key_id,
};

console.log(awsConfig);

AWS.config.update(awsConfig);

let dynamoDB = new AWS.DynamoDB.DocumentClient();

const getUserById = (id) => {
  var params = {
    TableName: 'user-state',
    Key: {
      user_id: id,
    },
  };

  return dynamoDB.get(params).promise();
};

const deleteUserById = (id) => {
  var params = {
    TableName: 'user-state',
    Key: {
      user_id: id,
    },
  };

  return dynamoDB.delete(params).promise();
};

const createNewUserWithId = (id, maze, start, end) => {
  var params = {
    TableName: 'user-state',
    Item: {
      user_id: id,
      maze: maze,
      start: start,
      end: end,
      solved: false,
    },
  };

  dynamoDB.put(params, (err, data) => {
    if (err) {
      console.log('from-put', { err });
    } else {
      console.log('from-put', { data });
    }
  });
};

const updateUserWithMaze = (id, maze, start, end) => {
  var params = {
    TableName: 'user-state',
    Item: {
      user_id: id,
      maze: maze,
      start: start,
      end: end,
      solved: false,
    },
  };

  dynamoDB.put(params, (err, data) => {
    if (err) {
      console.log('from-put', { err });
    } else {
      console.log('from-put', { data });
    }
  });
};

module.exports = {
  getUserById,
  createNewUserWithId,
  deleteUserById,
  updateUserWithMaze,
};
