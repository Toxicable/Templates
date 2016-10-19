/**
 * Created by Fabian on 19/10/2016.
 */
import { Component, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'file-upload',
    template: '<input type="file">'
})
export class FileUploadComponent {
    constructor(private http: Http, private el: ElementRef) {}

    upload() {
        let inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length > 0) { // a file was selected
            let file:FileList = inputEl.files[0];
            this.http
                .post('/api/test/fileupload', file)
                .subscribe();
            // do whatever you do...
            // subscribe to observable to listen for response
        }
    }
}