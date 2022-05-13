import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss']
})
export class GeneratePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('GeneratePasswordComponent INIT');
   }

}
