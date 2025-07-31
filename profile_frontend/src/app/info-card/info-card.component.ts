import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * InfoCardComponent displays a stylized information card with an icon, value, label, and badge.
 * Accepts icon (Material icon name), value, label/title, and badge text as @Input properties.
 * Styles match the dashboard's info-card look.
 */
@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  // PUBLIC_INTERFACE
  @Input() icon: string = '';              // Material Icons name (optional)
  @Input() value: string | number = '';    // Main value
  @Input() label: string = '';             // Title or label
  @Input() badge: string = '';             // Badge text/value (optional)
}
