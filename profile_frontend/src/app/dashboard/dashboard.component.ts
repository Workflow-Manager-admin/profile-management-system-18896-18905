import { Component, inject } from '@angular/core';
import { CommonModule, NgStyle, isPlatformBrowser, PLATFORM_ID } from '@angular/common';
import { InfoCardComponent } from '../info-card/info-card.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Renderer2 } from '@angular/core';

/**
 * DashboardComponent
 * A controller for dashboard, manages sidebar toggling logic and main content.
 */
interface Profile {
  name: string;
  devices: number;
  type: 'Impromptu' | 'Schedule';
  status: 'Active' | 'Inactive';
  created: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, NgStyle, InfoCardComponent, SidebarComponent],
})
export class DashboardComponent {
  sidebarOpen: boolean = false; // Sidebar is hidden by default
  activeMenu: 'profile' | 'firmware' | 'device' = 'profile';

  // Dismiss outside click listener handle
  private globalClickUnlisten: (() => void) | null = null;

  // Cards displayed at the top
  infoCards = [
    {
      title: 'Total Profiles',
      value: 6,
      badge: '+2 from yesterday',
      icon: 'assignment_ind',
    },
    {
      title: 'Created Today',
      value: 5,
      badge: 'Last created 2h ago',
      icon: 'calendar_today',
    },
    {
      title: 'Active Devices',
      value: 3,
      badge: '71.5% active rate',
      icon: 'devices',
    },
  ];

  // Filtering tab options
  filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Impromptu', value: 'Impromptu' },
    { label: 'Schedule', value: 'Schedule' },
  ];
  activeTab: string = 'All';
  searchTerm: string = '';

  profiles: Profile[] = [
    {
      name: 'Marketing Q2',
      devices: 5,
      type: 'Schedule',
      status: 'Active',
      created: '2024-06-21 14:18',
    },
    {
      name: 'Booth Demo',
      devices: 2,
      type: 'Impromptu',
      status: 'Active',
      created: '2024-06-21 13:10',
    },
    {
      name: 'Field Training',
      devices: 1,
      type: 'Schedule',
      status: 'Inactive',
      created: '2024-06-19 09:22',
    },
    {
      name: 'Regional Sync',
      devices: 4,
      type: 'Impromptu',
      status: 'Active',
      created: '2024-06-17 17:33',
    },
    {
      name: 'Monthly Standup',
      devices: 2,
      type: 'Schedule',
      status: 'Inactive',
      created: '2024-06-15 08:00',
    },
  ];

  constructor() {}

  // SSR-safe device width detection
  isMobile(): boolean {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      // Only access window if running in the browser
      return typeof window !== 'undefined' && window.innerWidth <= 850;
    }
    return false;
  }

  // PUBLIC_INTERFACE
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      if (isPlatformBrowser(this.platformId)) {
        Promise.resolve().then(() => this.addOutsideClickListener());
      }
    } else {
      this.removeOutsideClickListener();
    }
  }

  // PUBLIC_INTERFACE
  onSidebarMenu(section: string): void {
    if (section === 'profile' || section === 'firmware' || section === 'device') {
      this.activeMenu = section as typeof this.activeMenu;
      if (this.isMobile()) {
        this.sidebarOpen = false;
        this.removeOutsideClickListener();
      }
    }
  }

  // Handler for UI overlay (or hamburger) clicking
  private addOutsideClickListener(): void {
    const platformId = inject(PLATFORM_ID);
    const renderer = inject(Renderer2);
    if (!isPlatformBrowser(platformId)) return;
    if (this.globalClickUnlisten) return;
    this.globalClickUnlisten = renderer.listen('document', 'mousedown', (event: MouseEvent) => {
      if (typeof document === 'object') {
        const sidebarElem = document.querySelector('.sidebar-container');
        const hamburgerElem = document.querySelector('.sidebar-hamburger');
        if (sidebarElem && sidebarElem.contains(event.target as Node)) return;
        if (hamburgerElem && hamburgerElem.contains(event.target as Node)) return;
      }
      this.closeSidebar();
    });
  }

  private removeOutsideClickListener(): void {
    if (this.globalClickUnlisten) {
      this.globalClickUnlisten();
      this.globalClickUnlisten = null;
    }
  }

  private closeSidebar(): void {
    this.sidebarOpen = false;
    this.removeOutsideClickListener();
  }

  // PUBLIC_INTERFACE
  get filteredProfiles(): Profile[] {
    let filtered = this.profiles;
    if (this.activeTab !== 'All') {
      filtered = filtered.filter((p) => p.type === this.activeTab);
    }
    if (this.searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    return filtered;
  }

  // PUBLIC_INTERFACE
  setTab(tab: string): void {
    this.activeTab = tab;
  }

  // PUBLIC_INTERFACE
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  // PUBLIC_INTERFACE
  createProfile(): void {
    // Handler for create profile button (route to form or open dialog)
    // Add logic as needed.
    console.log('Create Profile tapped.');
  }

  // PUBLIC_INTERFACE
  handleAction(profile: Profile, action: 'edit' | 'download' | 'delete'): void {
    // Lint-safe stub for edit, download, and delete actions
    console.log(`Action: ${action} on profile: ${profile.name}`);
  }
}
