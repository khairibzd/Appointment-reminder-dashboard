'use server';
import { Patient } from '@/constants/data';
import { createClient } from '@/utils/supabase/server';

export const GetAllPatientsCount = async () => {
  const supabase = createClient(true);

  const { data, error } = await supabase
    .from('patients')
    .select('id', { count: 'exact' });

  if (error) {
    console.error('Error fetching patient count:', error);
  } else {
    const patientCount = data.length > 0 ? data.length : 0;
    return patientCount;
  }
};

export const GetAllPatients = async (): Promise<Patient[]> => {
  const supabase = createClient(true);

  const { data: patients, error }: any = await supabase
    .from('patients')
    .select('*');
  if (error) {
    console.error('Error fetching patient ', error);
  }
  return patients;
};
