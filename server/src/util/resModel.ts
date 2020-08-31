import { logger } from '../config/logger';
interface BaseModule {
    message: string | Error;
    data?: any;
    code: number;
}

export class SuccessModule implements BaseModule {
    message: string;
    data?: any;
    code: number;
    constructor(message: string, data?: any) {
        this.message = message;
        this.data = data;
        this.code = 200;
    }
}

export class ErrorModule implements BaseModule {
    message: string | Error;
    data?: any;
    code: number;
    constructor(message: string | Error, data?: any) {
        this.message = message instanceof Error ? message.message : message;
        this.data = data;
        this.code = -1;
        logger.error(message);
    }
}
