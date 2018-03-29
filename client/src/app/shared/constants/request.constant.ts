class BaseRequest {
    public domain = 'localhost';
    public path: string;
    public port = '3000';
    public protocol = 'http';

    public get base() {
        return `${this.protocol}://${this.domain}:${this.port}/${this.path}/`;
    }
}

export class ApiRequest extends BaseRequest {
    public path = 'api';
}

export class AuthRequest extends BaseRequest {
    public path = 'auth';
}

export class AvatarRequest extends BaseRequest {
    public path = 'avatar';
}

export class ImagesRequest extends BaseRequest {
    public path = 'assets/images';
    public port = '4200';
}
