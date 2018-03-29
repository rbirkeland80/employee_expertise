import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AvatarRequest, ImagesRequest } from '../../shared/constants/request.constant';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
    selector: 'ee-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    @Input() username: string;
    avatarImagePath: string;
    defaultAvatarUrl = `${new ImagesRequest().base}avatar.png`;
    private avatarBaseUrl = new AvatarRequest().base;

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
        this.avatarImagePath = this.username
            ? `${this.avatarBaseUrl}${this.username}.png`
            : this.defaultAvatarUrl;
    }

    onZoom(): void {
        const dialogRef = this.dialog.open(ImageDialogComponent, {
            data: { url: this.avatarImagePath }
        });
    }
}
