import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Branch } from '../../../../branches/models/branch';
import { BranchService } from '../../../../branches/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';

@Component({
  selector: 'app-update-branch',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminSidebarComponent
  ],
  templateUrl: './update-branch.component.html',
  styleUrl: './update-branch.component.scss',

})
export class UpdateBranchComponent {

  branchForm:FormGroup; // FormGroup tanımlıyoruz
  branch:Branch;

  constructor(
    private FormBuilder:FormBuilder, // FormBuilder kullanacağız
    private branchService:BranchService,
    private toastrService:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm(); // Formu başlatıyoruz
    this.getBranches(); // hasta profili bilgilerini alıyoruz
  }

  initForm() {
    // Formu başlatıyoruz, form alanlarını tanımlıyoruz ve validasyonları ekliyoruz
    this.branchForm = this.FormBuilder.group({
      id: [''], // ID alanı formda saklı olacak, ama HTML'de görünmeyecek
      Name: ['', Validators.required],

    });
  }

  getBranches() {
    this.route.paramMap.subscribe(params => {
      const branchId = params.get('branchId');
  
      if (branchId) { // null veya undefined değilse devam ediyoruz
        this.branchService.getByBranchId(branchId,0,1).subscribe(
          (data) => {
            this.branch = data;
            this.branchForm.patchValue({
              id: data.id,
             Name: data.name,
         
            });
          },
          (error) => {
            console.error('branş alınamadı:', error);
          }
        );
      } else {
        console.error('Geçersiz Branş ID parametresi');
      }
    });
  }

  updateBransh() {
    if (this.branchForm.valid) {
      // Formun geçerli olup olmadığını kontrol ediyoruz
      const updatedBranch:Branch = this.branchForm.value; // Form verilerini Doctor nesnesine atıyoruz
      updatedBranch.id = this.branch.id;
      
      //console.log(updatedHasta);
      this.branchService.updateBranch(updatedBranch).subscribe(
        (response) => {
          this.toastrService.success('Branş başarıyla güncellendi');
          this.router.navigate(['/admin-branches']);
        },
        (error) => {
          this.toastrService.error('Aynı branchten var');
          
        }
      );
    } else {
      // Form geçerli değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }
}
