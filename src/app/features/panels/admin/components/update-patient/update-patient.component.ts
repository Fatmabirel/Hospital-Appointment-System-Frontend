import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../../../Patients/patientModel';
import { PatientService } from '../../../../Patients/patient.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminSidebarComponent,   
  ],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.scss',

})
export class UpdatePatientComponent { 

  patientForm:FormGroup; // FormGroup tanımlıyoruz
  patient:Patient;

  constructor(
    private FormBuilder:FormBuilder, // FormBuilder kullanacağız
    private PatientService:PatientService,
    private toastrService:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm(); // Formu başlatıyoruz
    this.getPatientProfile(); // hasta profili bilgilerini alıyoruz
  }

  initForm() {
    // Formu başlatıyoruz, form alanlarını tanımlıyoruz ve validasyonları ekliyoruz
    this.patientForm = this.FormBuilder.group({
      id: [''], // ID alanı formda saklı olacak, ama HTML'de görünmeyecek
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getPatientProfile() {
    this.route.paramMap.subscribe(params => {
      const patientId = params.get('patientId');
  
      if (patientId) { // null veya undefined değilse devam ediyoruz
        this.PatientService.getByPatientId(patientId,0,1).subscribe(
          (data) => {
            this.patient = data;
            this.patientForm.patchValue({
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              age:data.age,
              height:data.height,
              weight:data.weight,
              bloodGroup:data.bloodGroup,
              dateOfBirth: data.dateOfBirth,
              nationalIdentity: data.nationalIdentity,
              phone: data.phone,
              address: data.address,
              email: data.email,
              password:data.passwordSalt

              
            });
          },
          (error) => {
            console.error('Hasta profili alınamadı:', error);
          }
        );
      } else {
        console.error('Geçersiz Hasta ID parametresi');
      }
    });
  }

  updatePatient() {
    if (this.patientForm.valid) {
      // Formun geçerli olup olmadığını kontrol ediyoruz
      const updatedPatient:Patient = this.patientForm.value; // Form verilerini Doctor nesnesine atıyoruz
      updatedPatient.id = this.patient.id;
      
      //console.log(updatedDoctor);
      this.PatientService.updatePatient(updatedPatient).subscribe(
        (response) => {
          this.toastrService.success('Hasta başarıyla güncellendi');
          this.router.navigate(['/admin-patient']);
        },
        (error) => {
          console.error('Hasta güncellenemedi:', error);
        }
      );
    } else {
      // Form geçerli değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }

}
