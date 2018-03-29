import { Observable } from 'rxjs/Observable';

// Dialog mocks
export class MockMatDialogRef {
    afterAllClosed: Observable<void>;
    afterOpen: any;
    openDialogs: any;
    close = function () {};
    closeAll = function () {};
    getDialogById = function () {};
    open = function () {};
}

export class MockMatDialog {
    open = function () {};
}
