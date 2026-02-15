import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from "@angular/common";
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'valentine-site';
}
