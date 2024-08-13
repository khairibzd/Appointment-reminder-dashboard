import { GetAllPatients } from '@/actions/Patient';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
// import { users } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Patient', link: '/dashboard/patient' }
];
export default async function page() {
  const patients = await GetAllPatients()
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={patients} />
      </div>
    </PageContainer>
  );
}
