import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-live-support',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-support.component.html',
  styleUrl: './live-support.component.scss'
})
export class LiveSupportComponent {
  messages: Message[] = [
    { id: 1, text: 'Randevu nasıl alabilirim?' },
    { id: 2, text: 'Doktorla nasıl iletişime geçebilirim?' },
    { id: 3, text: 'Laboratuvar sonuçlarımı nasıl görebilirim?' },
    { id: 4, text: 'Faturamı nasıl ödeyebilirim?' },
    { id: 5, text: 'Hastane adresi nedir?' }
  ];

  selectMessage(message: Message) {
    switch (message.id) {
      case 1:
        message.response = 'Randevu almak için ana sayfadan "Randevu Al" butonuna tıklayabilirsiniz.';
        break;
      case 2:
        message.response = 'Doktorla iletişime geçmek için "İletişim" bölümünden doktorunuzun iletişim bilgilerine ulaşabilirsiniz.';
        break;
      case 3:
        message.response = 'Laboratuvar sonuçlarınızı görmek için "Sonuçlar" bölümüne giriş yapabilirsiniz.';
        break;
      case 4:
        message.response = 'Faturalarınızı online olarak "Fatura Ödeme" bölümünden ödeyebilirsiniz.';
        break;
      case 5:
        message.response = 'Hastane adresi: [Adres Bilgisi]';
        break;
      default:
        message.response = 'Belirtilen konu hakkında bilgi bulunamadı.';
    }
  }
}
