import mongoose, { Schema } from 'mongoose';
import { ITask, Task_Priority_Type, Task_Status } from './task.interface';

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  dueDate: {
    type: Date,
    default: null,
    required: true
  },
  priority: {
    type: String,
    enum: Task_Priority_Type,
    default: Task_Priority_Type.MEDIUM,
  },
  status: {
    type: String,
    enum: Task_Status,
    default: Task_Status.PENDING,
  },
  assignedTo: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
taskSchema.pre<ITask>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const TaskModel = mongoose.model<ITask>('Task', taskSchema);
export default TaskModel;
