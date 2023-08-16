import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    // Implement your authentication logic here
    if (this.username === '1234' && this.password === '1234') {
      // Navigate to the compression page upon successful login
      // I need to implemet a proper authentication service but this si just for the test, normally I use JWT
      // and use routing guards for a more secure approach.
      // For this example, I'll just navigate.
      window.location.href = '/compression';
    } else {
      // Display a login error message
      alert('Invalid credentials');
    }
  }
}
