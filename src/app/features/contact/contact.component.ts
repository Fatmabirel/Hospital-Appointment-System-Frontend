import { Component } from '@angular/core';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BasicLayoutComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(
    private toastrService: ToastrService,
    private router: Router
  ) {
    
  }
  checkRegisteredUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.toastrService.warning('İletişim formunu doldurmak için lütfen giriş yapın.');
      this.router.navigateByUrl('/login');
    } else {
      this.toastrService.success('Geri bildirim ve önerileriniz için kullanıcı panelini kullanın')
    }
  }

  
  
}
