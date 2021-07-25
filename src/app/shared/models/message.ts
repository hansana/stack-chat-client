import { v4 as uuidv4 } from 'uuid';

export class Message {
  constructor() {
    this.id = uuidv4(),
    this.userId = "",
    this.userName = "",
    this.type = MESSAGE_TYPE.TEXT,
    this.message = "",
    this.date = new Date() 
  }

  id: string;
  userId: string;
  userName: string;
  type: number;
  message: string;
  date: Date;
}

export const MESSAGE_TYPE = {
  TEXT: 0,
  IMAGE: 1,
  VIDEO: 2
}