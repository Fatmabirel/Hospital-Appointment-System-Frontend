import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Doctor } from '../../../../doctors/models/doctor';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.scss',
})
export class UpdateDoctorComponent {
  doctorForm: FormGroup; // FormGroup tanımlıyoruz
  doctor: Doctor;

  constructor(
    private formBuilder: FormBuilder, // FormBuilder kullanacağız
    private doctorService: DoctorService,
    private toastrService: ToastrService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm(); // Formu başlatıyoruz
    this.getDoctorProfile(); // Doktor profili bilgilerini alıyoruz
  }

  initForm() {
    // Formu başlatıyoruz, form alanlarını tanımlıyoruz ve validasyonları ekliyoruz
    this.doctorForm = this.formBuilder.group({
      id: [''], // ID alanı formda saklı olacak, ama HTML'de görünmeyecek
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      branchID: ['', Validators.required],
      branchName: [''],
      title: ['', Validators.required],
      schoolName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getDoctorProfile() {
    this.route.paramMap.subscribe(params => {
      const doctorId = params.get('doctorId');
  
      if (doctorId) { // null veya undefined değilse devam ediyoruz
        this.doctorService.getDoctorById(doctorId).subscribe(
          (data) => {
            this.doctor = data;
            this.doctorForm.patchValue({
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              branchID: data.branchID,
              branchName: data.branchName,
              title: data.title,
              schoolName: data.schoolName,
              dateOfBirth: data.dateOfBirth,
              nationalIdentity: data.nationalIdentity,
              phone: data.phone,
              address: data.address,
              email: data.email
            });
          },
          (error) => {
            console.error('Doktor profili alınamadı:', error);
          }
        );
      } else {
        console.error('Geçersiz doktor ID parametresi');
      }
    });
  }

  updateDoctor() {
    if (this.doctorForm.valid) {
      // Formun geçerli olup olmadığını kontrol ediyoruz
      const updatedDoctor: Doctor = this.doctorForm.value; // Form verilerini Doctor nesnesine atıyoruz
      updatedDoctor.id = this.doctor.id;
      updatedDoctor.branchID = this.doctor.branchID;
      //console.log(updatedDoctor);
      this.doctorService.updateDoctor(updatedDoctor).subscribe(
        (response) => {
          this.toastrService.success('Doktor başarıyla güncellendi');
          this.router.navigate(['admin-list-doctor']);
        },
        (error) => {
          console.error('Doktor güncellenemedi:', error);
        }
      );
    } else {
      // Form geçerli değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }
}
