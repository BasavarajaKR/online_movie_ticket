import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from '../../admin-layout/admin-layout.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, AdminLayoutComponent],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
