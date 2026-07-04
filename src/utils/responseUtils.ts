export interface SuccessResponseInterface {
    success: boolean;
    message: string;
    status: number;
    data: any;
}

export interface ErrorResponseInterface {
    success: boolean;
    status: number;
    error: any;
}

class ResponseUtil {
    static data: any = {};
    static error: any = 'Error.';
    static success: boolean = true;
    static statusCode: number = 200;
    static message: string = 'success.';

    static handleSuccess(statusCode: number, message: string, data: any): void {
        this.statusCode = statusCode;
        this.message = message;
        this.success = true;
        this.data = data;
    }

    static handleError(statusCode: number, error: any): void {
        this.statusCode = statusCode;
        this.success = false;
        this.error = error;
    }
    
    static response(res): void {
        if (this.success === true) {
            const response: SuccessResponseInterface = { status: this.statusCode, success: true, message: this.message, data: this.data, };
            res.status(this.statusCode).json(response);
        } else {
            const response: ErrorResponseInterface = { status: this.statusCode, success: false, error: this.error, };
            res.status(this.statusCode).json(response);
        }
    }
}

export default ResponseUtil;
