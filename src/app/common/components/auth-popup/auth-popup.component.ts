import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface AuthPopupData{
  canLogin:boolean,
}

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent implements OnInit {
  notDisplayAnymore:boolean=false

  constructor(public dialogRef: MatDialogRef<AuthPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AuthPopupData,
              @Inject('WINDOWS') private windows:Window) {
    dialogRef.afterClosed().subscribe(()=>{
      windows.localStorage.setItem('display-login-popup',JSON.stringify(!this.notDisplayAnymore))
    })
  }

  ngOnInit(): void {
  }

  clickOk() {
    this.data.canLogin=true
    this.dialogRef.close(this.data.canLogin)
  }

  clickCancel() {
    this.data.canLogin=false
    this.dialogRef.close(this.data.canLogin)
  }
}
