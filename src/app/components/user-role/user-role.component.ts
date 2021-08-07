import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css'],
})
export class UserRoleComponent {
  selectedValue!: string;
  roleControl = new FormControl('', Validators.required);

  constructor(private route: Router) {}

  roles: Role[] = [
    { value: 'Owner', viewValue: 'Owner' },
    { value: 'ServiceProvider', viewValue: 'Service Provider' },
  ];

  ngOnInit(): void {}

  selected() {
    console.log(this.selectedValue);
    this.route.navigate(['/register-user' + this.roles]);
  }
}
