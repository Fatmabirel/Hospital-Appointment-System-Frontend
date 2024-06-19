import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../core/auth/services/token.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(private tokenService:TokenService,private router: Router){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Token varsa true, yoksa false
  }

  directUsers(){
    const userRoles=this.tokenService.getUserRole();

    if(userRoles=="Admin")
    this.router.navigate(['admin-sidebar']);  // Başarılı girişten sonra yönlendirme
     else if(userRoles.includes("Doctors.Update"))
    this.router.navigate(['doctor-dashboard'])
    else if(userRoles.includes("Patients.Update"))
      this.router.navigate(['patient-sidebar'])
  }
}
