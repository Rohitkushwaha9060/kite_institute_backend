import http from "http";

// file imports
import app from "./app";
import { logger, secrets } from "./core";

// server initialization
const server = http.createServer(app);

// server start
server.listen(secrets.PORT, () => {
  logger.info(`Server is running on port ${secrets.PORT}`);
});
