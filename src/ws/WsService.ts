import WebSocket, {RawData, WebSocketServer} from "ws";
import * as process from "process";

interface IParseData {
    type: string;
    data: string
    id?: number;
}

interface IUser {
    name: string,
    password: string,
    id: string,
}

class WsService {
    private PORT = process.env.WS_PORT || 3000;
    private ws: WebSocketServer;
    private users = new Map<string, IUser>();

    constructor() {
        this.ws = new WebSocketServer({port: +this.PORT});
        this.ws.on('connection', (socket: WebSocket) => {
            console.table({url: socket.url, protocol: socket.protocol, state: socket.readyState});
            socket.on('message', (msg: RawData) => {
                const {type, data}: IParseData = JSON.parse(msg.toString());
                console.log(JSON.parse(msg.toString()))
                switch (type) {
                    case 'reg':
                        const user = JSON.parse(data);
                        const userId = Date.now().toString();
                        this.users.set(userId, {...user, id: userId});
                        const createdUser = this.users.get(userId);
                        if (createdUser) {
                            const jsonUser = {
                                name: createdUser.name,
                                index: createdUser.id,
                                error: false,
                                errorText: '',
                            }
                            const createReq = {
                                type,
                                data: JSON.stringify(jsonUser),
                                id: 0,
                            }
                            console.log(createReq)
                            socket.send(JSON.stringify(createReq));
                        } else {
                            const jsonUser = {
                                name: user.name,
                                    index: '',
                                    error: true,
                                    errorText: 'Error',
                            };
                            const createReq = {
                                type,
                                data: JSON.stringify(jsonUser),
                                id: 0,
                            }
                            socket.send(JSON.stringify(createReq));
                        }
                        break;
                }
            })
        })
    }
}

export default WsService;
