export class ResponseErro {
    message: string;
    status: number;

    constructor(status?: number, message?: string) {
      this.status = status;
      this.message = message;
    }
}

