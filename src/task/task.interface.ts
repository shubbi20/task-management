import { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: Task_Priority_Type;
  status: Task_Status;
  assignedTo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Task_Status{
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}

export enum Task_Priority_Type{
    LOW = 'low', 
    MEDIUM = 'medium',
    HIGH = 'high'
}
