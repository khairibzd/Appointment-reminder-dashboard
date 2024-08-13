"use server"
import { Appointment } from '@/constants/data';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const GetAllAppoinmentsCount = async () => {
  const supabase = createClient(true);

  const { data, error } = await supabase
    .from('appointments')
    .select('id', { count: 'exact' });

  if (error) {
    console.error('Error fetching patient count:', error);
  } else {
    const appoinmentCount = data.length > 0 ? data.length : 0;
    return appoinmentCount;
  }
};

export const GetAllAppointments = async (): Promise<Appointment[]> => {
  const supabase = createClient(true);

  const { data: appoinments, error }: any = await supabase
    .from('appointments')
    .select('*');
  if (error) {
    console.error('Error fetching appoinments ', error);
  }

  return appoinments;
};

export const createAppointment = async (values: {
  date: string; // ISO string
  phone_number: string;
}) => {
  const supabase = createClient(true);

  const { data, error } = await supabase
    .from('appointments')
    .insert([
      {
        appointment_date: values.date,
        phone_number: values.phone_number,
        reminder_sent: false
      }
    ])
    .select();
  if (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/appointment')
  revalidatePath('/dashboard')
  return true;
};
