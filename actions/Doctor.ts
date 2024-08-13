"use server"
import { createClient } from "@/utils/supabase/server";


export const GetAllDoctor = async () => {
    const supabase = createClient(true);
  
    const { data, error } = await supabase
      .from('doctors')
      .select('id', { count: 'exact' });
  
      if (error) {
          console.error('Error fetching patient count:', error);
        } else {
          const doctorCount = data.length > 0 ? data.length : 0;
          return doctorCount
        }
  };
  