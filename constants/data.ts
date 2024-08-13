import { NavItem } from '@/types';

export type Patient = {
  id: number;
  name: string;
  phone_number: string;
  symptom: string;
};


// export type Employee = {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   gender: string;
//   date_of_birth: string; // Consider using a proper date type if possible
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   zipcode: string;
//   longitude?: number; // Optional field
//   latitude?: number; // Optional field
//   job: string;
//   profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
// };

export type Appointment = {
  id: number;
  patient_id: number;
  appointment_date: Date;
  phone_number: number 
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Patient',
    href: '/dashboard/patient',
    icon: 'user',
    label: 'patient'
  },
  {
    title: 'Appointments',
    href: '/dashboard/appointment',
    icon: 'spinner',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
