'use client';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { createAppointment } from '@/actions/Appoinments';
import { Input } from './ui/input';

function BookAppointment() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState<{ time: string }[]>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(
    undefined
  );
  const [phoneNumber, setPhoneNumber] = useState<any>();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' });
      timeList.push({ time: i + ':30 AM' });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ':00 PM' });
      timeList.push({ time: i + ':30 PM' });
    }

    setTimeSlot(timeList);
  };
  const handle = async () => {
    if (!selectedTimeSlot || !date) return;

    // Split the selected time to get hours and minutes
    const [time, period] = selectedTimeSlot.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    // Convert to 24-hour format if necessary
    // if (period === 'PM' && hours !== 12) {
    //   hours += 12;
    // } else if (period === 'AM' && hours === 12) {
    //   hours = 0; // Handle midnight
    // }

    // Create a new Date object for the selected time slot
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes);

    // Convert to ISO string
    const isoAppointmentTime = appointmentDate.toISOString();

    console.log(
      'This is from book components:',
      appointmentDate.toLocaleString(),
      ':::',
      isoAppointmentTime,
      phoneNumber
    );

    // Call the server action to create the appointment
    const result = await createAppointment({
      date: isoAppointmentTime,
      phone_number: phoneNumber
    });

    if (result) {
      console.log('Appointment successfully created.');
    } else {
      console.log('Failed to create appointment.');
    }
  };

  const isPastDay = (day: Date) => {
    const now = new Date();
    
    // Check if the day is in the past
    if (day < new Date(now.setHours(0, 0, 0, 0))) {
      return true;
    }
  
    // Check if the day is today and if the current time is past 4 hours from the beginning of the day
    const hoursDifference = now.getHours() - day.getHours();
    if (day.toDateString() === now.toDateString() && hoursDifference >= 4) {
      return true;
    }
  
    return false;
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Add new Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pick a time slot</DialogTitle>
          <DialogDescription>
            <div>
              <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2">
                {/* Calendar */}
                <div className="flex flex-col items-baseline gap-3">
                  <h2 className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => day && setDate(day)}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                {/* Time Slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 rounded-lg border p-5">
                    {timeSlot?.map((item: any, index: any) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`cursor-pointer rounded-full border p-2 text-center hover:bg-primary hover:text-white ${
                          item.time == selectedTimeSlot &&
                          'bg-primary text-white'
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Input
                className="mt-3"
                placeholder="phone numeber"
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="border-red-500 text-red-500"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!(date && selectedTimeSlot)}
            onClick={() => handle()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
