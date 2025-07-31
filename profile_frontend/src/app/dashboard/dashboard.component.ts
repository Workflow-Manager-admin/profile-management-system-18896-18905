import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';

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
  imports: [CommonModule, NgStyle]
})
export class DashboardComponent {
  // PUBLIC_INTERFACE
  infoCards = [
    { title: 'Total Profiles', value: 6, badge: '+2 from yesterday' },
    { title: 'Created Today', value: 5, badge: 'Last created 2h ago' },
    { title: 'Active Devices', value: 3, badge: '71.5% active rate' }
  ];

  // PUBLIC_INTERFACE
  filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Impromptu', value: 'Impromptu' },
    { label: 'Schedule', value: 'Schedule' }
  ];
  activeTab: string = 'All';
  searchTerm: string = '';

  // Sample mock data for table
  profiles: Profile[] = [
    {
      name: 'Marketing Q2',
      devices: 5,
      type: 'Schedule',
      status: 'Active',
      created: '2024-06-21 14:18'
    },
    {
      name: 'Booth Demo',
      devices: 2,
      type: 'Impromptu',
      status: 'Active',
      created: '2024-06-21 13:10'
    },
    {
      name: 'Field Training',
      devices: 1,
      type: 'Schedule',
      status: 'Inactive',
      created: '2024-06-19 09:22'
    },
    {
      name: 'Regional Sync',
      devices: 4,
      type: 'Impromptu',
      status: 'Active',
      created: '2024-06-17 17:33'
    },
    {
      name: 'Monthly Standup',
      devices: 2,
      type: 'Schedule',
      status: 'Inactive',
      created: '2024-06-15 08:00'
    }
  ];

  // PUBLIC_INTERFACE
  get filteredProfiles() {
    let filtered = this.profiles;
    if (this.activeTab !== 'All') {
      filtered = filtered.filter(p => p.type === this.activeTab);
    }
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()));
    }
    return filtered;
  }

  // PUBLIC_INTERFACE
  setTab(tab: string) {
    this.activeTab = tab;
  }

  // PUBLIC_INTERFACE
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  // PUBLIC_INTERFACE
  createProfile() {
    // Handler for create profile button (route to form or open dialog)
    console.log('Create Profile tapped.');
  }

  // PUBLIC_INTERFACE
  handleAction(profile: Profile, action: 'edit' | 'download' | 'delete') {
    // Lint-safe stub
    console.log(`Action: ${action} on profile: ${profile.name}`);
  }
}
