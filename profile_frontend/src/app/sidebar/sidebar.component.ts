import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SidebarComponent
 * A responsive, collapsible sidebar for navigation.
 * Sections: Profile Management, Firmware Management, Device Management.
 * Emits (sectionSelected) with selected menu, controls open/close (collapsible drawer).
 * Styles are modern, pastel, with soft shadows and rounded corners.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  /** Which section is currently active (shown in main area) */
  @Input() activeSection: string = '';
  /** If true, sidebar is open; otherwise collapsed (mobile/desktop toggle) */
  @Input() open: boolean = true;

  /** Emitted when a navigation item is selected */
  @Output() sectionSelected = new EventEmitter<string>();
  /** Emitted when sidebar (drawer) should be toggled (for hamburger menu) */
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems = [
    { label: 'Profile Management', icon: 'person', key: 'profile' },
    { label: 'Firmware Management', icon: 'settings', key: 'firmware' },
    { label: 'Device Management', icon: 'devices', key: 'device' },
  ];

  // An input to control mobile mode from parent. (default: false)
  @Input() isMobile: boolean = false;

  // PUBLIC_INTERFACE
  selectSection(key: string) {
    this.sectionSelected.emit(key);
    if (this.isMobile) {
      this.toggleSidebar.emit();
    }
  }

  // PUBLIC_INTERFACE
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
