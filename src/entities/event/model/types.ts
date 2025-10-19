export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  groupId: string;
  createdAt: Date;
}

export interface EventParticipant {
  userId: string;
  eventId: string;
  status: 'joined' | 'pending' | 'declined';
  joinedAt: Date;
}