export class ApiRequest {
    public domain = 'localhost';
    public path = 'api';
    public port = '3000';
    public protocol = 'http';

    public get apiBase() {
        return `${this.protocol}://${this.domain}:${this.port}/${this.path}/`;
    }
}

export class AuthRequest {
    public domain = 'localhost';
    public path = 'auth';
    public port = '3000';
    public protocol = 'http';

    public get authBase() {
        return `${this.protocol}://${this.domain}:${this.port}/${this.path}/`;
    }
}
