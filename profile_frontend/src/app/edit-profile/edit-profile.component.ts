import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * EditProfileComponent
 * 
 * A modern, visually accessible form for editing a user profile.
 * Includes: header (gradient), name input, profile type dropdown, device dropdown, options row (upload box & checkbox).
 * Soft, modern styling is handled via SCSS. Proper Angular Forms support included via [(ngModel)].
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  @Input() initialName: string = 'John Doe';
  @Input() initialType: string = 'Schedule'; // Example
  @Input() typeOptions = ['Impromptu', 'Schedule', 'Enterprise', 'Test'];

  profileName: string = this.initialName;
  profileType: string = this.initialType;
  addDevice: string = '';
  availableDevices = ['Device Alpha', 'Device Beta', 'Device Gamma'];
  optionChecked: boolean = false;
  fileName: string = '';

  // PUBLIC_INTERFACE
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    } else {
      this.fileName = '';
    }
  }

  // PUBLIC_INTERFACE
  saveProfile() {
    // Logic to be hooked up later, stub for now
    alert('Profile saved! (stub)');
  }
}
