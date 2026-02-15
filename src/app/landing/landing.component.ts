import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  accepted = false;
  noX = 0;
  noY = 0;

  selectedDate: string | null = null;
  showDateOptions = false;
  userMessage: string = '';
  messageSent: boolean = false;

dateOptions = [
  { id: 'coffee', label: 'Evening Coffee & Sunset at Marina Beach ☕', icon: '🌇' },
  { id: 'dinner', label: 'Fancy Dinner at Night (Suggestions are welcome) 🍝', icon: '🕯️' },
  { id: 'movie', label: 'A sweet movie afternoon 🍿 (Jo movie aap bolo...)', icon: '🎬' },
  { id: 'walk', label: 'A Long Walk & Ice Cream(Only me, tera gala kharab hai :-)🍦', icon: '🌙' }
]

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Check if we are in the browser before using 'window'
    if (isPlatformBrowser(this.platformId)) {
      this.setInitialPosition();
    }
  }

  setInitialPosition() {
    // Center-ish position next to the "Yes" button
    this.noX = window.innerWidth / 2 + 50;
    this.noY = window.innerHeight / 2 + 60;
  }

  sayYes() {
    this.accepted = true;
  }

  moveNo() {
    if (isPlatformBrowser(this.platformId)) {
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 150;

      this.noX = Math.random() * maxX;
      this.noY = Math.random() * maxY;
    }
  }

  goToDateSelection() {
    this.showDateOptions = true;
  }

  selectDate(label: string) {
    this.selectedDate = label;
  }

  sendFinalMessage() {
    this.messageSent = true;
    
    fetch("https://formspree.io/f/mwvnowno", {
    method: "POST",
    body: JSON.stringify({ 
      date_choice: this.selectedDate, 
      love_note: this.userMessage 
    }),
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("Email sent successfully!");
    }
  })
  .catch(error => console.error("Error sending email:", error));
  }
}