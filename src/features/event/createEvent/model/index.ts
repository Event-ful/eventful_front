import { useState } from 'react';
import { LocationData } from '@/shared/ui/locationSearch';

export default function useCreateEvent() {
  const [eventName, setEventName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [personnel, setPersonnel] = useState<string>('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [date, setDate] = useState<string>('');

  const submitNewEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      eventName,
      description,
      personnel,
      date,
      location,
    };

    console.log(data);
  };

  return {
    eventName,
    setEventName,
    description,
    setDescription,
    personnel,
    setPersonnel,
    location,
    setLocation,
    date,
    setDate,
    submitNewEvent,
  };
}