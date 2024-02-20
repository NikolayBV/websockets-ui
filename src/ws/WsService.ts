import WebSocket, {WebSocketServer} from "ws";
import * as process from "process";

class WsService {
    private PORT = process.env.PORT || 3000;
    private ws: WebSocketServer;
    constructor() {
        this.ws = new WebSocketServer({port: +this.PORT});
        this.ws.on('connection', (socket: WebSocket) => {
            console.log('connection');
        })
    }
}

export default WsService;
