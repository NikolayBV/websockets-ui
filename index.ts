import { httpServer } from "./src/http_server";
import WsService from "./src/ws/WsService";

const HTTP_PORT = process.env.PORT || 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
new WsService()
