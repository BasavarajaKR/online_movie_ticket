import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {
  method: 'upi' | 'card' = 'upi';
  isProcessing: boolean = false;

  upi = {
    id: ''
  };

  card = {
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  };

  get isUpiValid(): boolean {
    return /.+@.+/.test(this.upi.id.trim());
  }

  get isCardValid(): boolean {
    const nameOk = this.card.name.trim().length > 1;
    const numberOk = /^[0-9]{16}$/.test(this.card.number.replace(/\s+/g, ''));
    const expiryOk = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(this.card.expiry.trim());
    const cvvOk = /^[0-9]{3,4}$/.test(this.card.cvv.trim());
    return nameOk && numberOk && expiryOk && cvvOk;
  }

  setMethod(m: 'upi' | 'card') {
    this.method = m;
  }

  formatCardNumber() {
    const digits = this.card.number.replace(/\D/g, '').slice(0, 16);
    this.card.number = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  submit() {
    if ((this.method === 'upi' && !this.isUpiValid) || (this.method === 'card' && !this.isCardValid)) {
      alert('Please fill valid payment details.');
      return;
    }
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      alert('Payment successful!');
    }, 1200);
  }
}
