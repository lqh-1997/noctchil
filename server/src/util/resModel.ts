interface BaseModule {
    message: string;
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
    message: string;
    data?: any;
    code: number;
    constructor(message: string, data?: any) {
        this.message = message;
        this.data = data;
        this.code = -1;
    }
}
