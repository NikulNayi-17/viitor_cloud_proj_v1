import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-ve-em-sp',
  templateUrl: './ve-em-sp.component.html',
  styleUrls: ['./ve-em-sp.component.css']
})
export class VeEmSpComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
