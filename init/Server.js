const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;

function startServer() {
  const app = express();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}

module.exports = startServer;
