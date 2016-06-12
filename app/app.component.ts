import {Component} from '@angular/core';
import {AlertComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploader, FILE_UPLOAD_DIRECTIVES}   from 'ng2-file-upload';

@Component({
  selector: 'my-app',
  directives: [AlertComponent, DATEPICKER_DIRECTIVES, FILE_UPLOAD_DIRECTIVES],
  template: `
    <alert type="info">ng2-bootstrap hello world!</alert>
      <pre>Selected date is: <em *ngIf="dt">{{ getDate() | date:'fullDate'}}</em></pre>
      <h4>Inline</h4>
      <div style="display:inline-block; min-height:290px;">
        <datepicker [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="true"></datepicker>
      </div>

      <style>
    .my-drop-zone { border: dotted 3px lightgray; }
    .nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */
    .another-file-over-class { border: dotted 3px green; }

    html, body { height: 100%; }
</style>

<div class="container">

    <div class="navbar navbar-default">
        <div class="navbar-header">
            <a class="navbar-brand" href>Angular2 File Upload</a>
        </div>
    </div>

    <div class="row">

        <div class="col-md-3">

            <h3>Select files</h3>

            <div ng2FileDrop
                 [ngClass]="{'nv-file-over': hasBaseDropZoneOver}"
                 (fileOver)="fileOverBase($event)"
                 [uploader]="uploader"
                 class="well my-drop-zone">
                Base drop zone
            </div>

            <div ng2FileDrop
                 [ngClass]="{'another-file-over-class': hasAnotherDropZoneOver}"
                 (fileOver)="fileOverAnother($event)"
                 [uploader]="uploader"
                 class="well my-drop-zone">
                Another drop zone
            </div>

            Multiple
            <input type="file" ng2FileSelect [uploader]="uploader" multiple  /><br/>

            Single
            <input type="file" ng2FileSelect [uploader]="uploader" />
        </div>

        <div class="col-md-9" style="margin-bottom: 40px">

            <h3>Upload queue</h3>
            <p>Queue length: </p>

            <table class="table">
                <thead>
                <tr>
                    <th width="50%">Name</th>
                    <th>Size</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let item of uploader.queue">
                    <td><strong></strong></td>
                    <td *ngIf="uploader.isHTML5" nowrap>0.00 MB</td>
                    <td *ngIf="uploader.isHTML5">
                        <div class="progress" style="margin-bottom: 0;">
                            <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }"></div>
                        </div>
                    </td>
                    <td class="text-center">
                        <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                        <span *ngIf="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                        <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                    </td>
                    <td nowrap>
                        <button type="button" class="btn btn-success btn-xs"
                                (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                            <span class="glyphicon glyphicon-upload"></span> Upload
                        </button>
                        <button type="button" class="btn btn-warning btn-xs"
                                (click)="item.cancel()" [disabled]="!item.isUploading">
                            <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                        </button>
                        <button type="button" class="btn btn-danger btn-xs"
                                (click)="item.remove()">
                            <span class="glyphicon glyphicon-trash"></span> Remove
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            <div>
                <div>
                    Queue progress:
                    <div class="progress" style="">
                        <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
                    </div>
                </div>
                <button type="button" class="btn btn-success btn-s"
                        (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
                    <span class="glyphicon glyphicon-upload"></span> Upload all
                </button>
                <button type="button" class="btn btn-warning btn-s"
                        (click)="uploader.cancelAll()" [disabled]="!uploader.isUploading">
                    <span class="glyphicon glyphicon-ban-circle"></span> Cancel all
                </button>
                <button type="button" class="btn btn-danger btn-s"
                        (click)="uploader.clearQueue()" [disabled]="!uploader.queue.length">
                    <span class="glyphicon glyphicon-trash"></span> Remove all
                </button>
            </div>

        </div>

    </div>

</div>
  `,
})
export class AppComponent {
  public dt:Date = new Date();
  private minDate:Date = null;
  private events:Array<any>;
  private tomorrow:Date;
  private afterTomorrow:Date;
  private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  private format = this.formats[0];
  private dateOptions:any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened:boolean = false;

  public getDate():number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
