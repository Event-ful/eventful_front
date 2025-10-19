export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  ownerId: string;
  memberCount: number;
}

export interface GroupMember {
  userId: string;
  groupId: string;
  role: 'owner' | 'member';
  joinedAt: Date;
}