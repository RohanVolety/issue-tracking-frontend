import { Component, Output, EventEmitter } from '@angular/core';
import { NgModel, } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchText = '';

  constructor(private router: Router) {}
  onSearch(): void {
    this.searchEvent.emit(this.searchText);
  }

  viewInsights(): void {
  
    this.router.navigate(['/view-insights']);
}
}