import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent, FormsModule,ReactiveFormsModule ],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent implements OnInit {
  doctorForm: FormGroup; // FormGroup tanımlıyoruz
  doctor: Doctor;

  constructor(
    private formBuilder: FormBuilder, // FormBuilder kullanacağız
    private doctorService: DoctorService,
    private toastrService: ToastrService,
    private router: Router
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
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getDoctorProfile() {
    this.doctorService.getDoctorProfile().subscribe(
      (data) => {
        this.doctor = data;
        // API'den gelen doktor bilgilerini form alanlarına set ediyoruz
        this.doctorForm.patchValue(data);
      },
      (error) => {
        console.error('Doktor profili alınamadı:', error);
      }
    );
  }

  updateDoctor() {
    if (this.doctorForm.valid) { // Formun geçerli olup olmadığını kontrol ediyoruz
      const updatedDoctor: Doctor = this.doctorForm.value; // Form verilerini Doctor nesnesine atıyoruz
      updatedDoctor.id = this.doctor.id;
      updatedDoctor.branchID = this.doctor.branchID;
      console.log(updatedDoctor);
      this.doctorService.updateDoctor(updatedDoctor).subscribe(
        (response) => {
          console.log('Doktor güncellendi:', response);
          this.toastrService.success('Bilgileriniz başarıyla güncellendi');
          this.router.navigate(['doctor-sidebar']);
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
