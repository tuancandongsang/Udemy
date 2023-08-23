import { UserAuthNS } from './auth';
import { HttpError } from '../lib/http';
import { Request , Response} from 'express';


const AUTH_DATA_SYMBOL = Symbol('auth-data');
function setAuthData(ctx: any, data: any) {
    ctx[AUTH_DATA_SYMBOL] = data;
}

export function GetAuthData(ctx: any): UserAuthNS.UserSession {
    return ctx[AUTH_DATA_SYMBOL];
}

export function NewAuthMiddleware(userAuthBLL: UserAuthNS.BLL) {
    return async (req: Request, res: Response) => {
        const header = req.headers['authorization'];
        if (!header || !header.startsWith('Bearer ')) {
            throw new HttpError("missing access token", 401);
        }
        const session_id = header.substr('Bearer '.length);
        const session = await userAuthBLL.GetUserSession(session_id);
        if (!session ) {
            throw new HttpError("session not found", 401);
        } else if (session.status == "deactive"){
            throw new HttpError("session expired please login again", 401);
        } else {
            setAuthData(req, session);
        }
    };
}
