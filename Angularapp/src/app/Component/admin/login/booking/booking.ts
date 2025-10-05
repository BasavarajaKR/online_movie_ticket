import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, AdminLayoutComponent],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
