import { GetAllAppointments } from '@/actions/Appoinments';
import BookAppointment from '@/components/book-appointment';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Appoinments', link: '/dashboard/appoinment' }
];

export default async function page() {
  const Appointments = await GetAllAppointments();
  const total = Appointments.length;
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Appointments (${total})`}
            description="Manage appointments"
          />

          <BookAppointment />
        </div>
        <Separator />

        <DataTable
          searchKey="phone_number"
          columns={columns}
          data={Appointments}
        />
      </div>
    </PageContainer>
  );
}
