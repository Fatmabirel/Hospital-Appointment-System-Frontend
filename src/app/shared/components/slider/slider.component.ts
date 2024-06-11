import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from "../basic-layout/basic-layout.component";


 @Component({
    selector: 'app-slider',
    standalone: true,
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss',
    imports: [CommonModule]
})
export class SliderComponent {

  slides = [
    {
      title: 'Sağlıkta Mükemmeliyet İçin Çalışıyoruz',
      description: 'Deneyimli sağlık ekibimizle en iyi sağlık hizmetini sunmak için buradayız. Sizin ve sevdiklerinizin sağlığı bizim önceliğimizdir.',
      image: '../../../../../assets/images/slider/doctors.jpg'
    },
    {
      title: 'Sağlık Hizmetlerinde Yenilikçi Yaklaşım',
      description: 'Teknoloji ve sağlık sektörünün birleşiminde, size özel çözümlerimizle sağlığınızı korumak için buradayız.',
      image: '../../../../../assets/images/slider/sağlık.jpg'
    },
    {
      title: 'Sağlıkta İhtiyacınız Olan Her Şey Burada',
      description: 'Tam teşekküllü tıbbi ekipmanlarımız ve uzman sağlık personelimizle sağlık sorunlarınızı çözmek için yanınızdayız.',
      image: '../../../../../assets/images/slider/heart.png'
    },
    {
      title: 'Sağlıkta Öncü Olmak İçin Buradayız',
      description: 'Sektördeki en son teknolojileri kullanarak sizlere en iyi sağlık hizmetini sunmayı taahhüt ediyoruz.',
      image: '../../../../../assets/images/slider/sağlık2.jpeg'
    },
    // Diğer slaytlar burada eklenebilir
  ];

  currentSlide = 0;

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  getSliderTransform() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }
}
