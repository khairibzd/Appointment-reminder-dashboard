'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Patient } from '@/constants/data';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { AddPatient } from '@/components/add-patient';

interface ProductsClientProps {
  data: Patient[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Patients (${data.length})`}
          description="Manage patients  "
        />
        <AddPatient
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
      <Separator />
      <DataTable searchKey="phone_number" columns={columns} data={data} />
    </>
  );
};
