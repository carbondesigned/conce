export interface ISession {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  tasks?: ITask[];
  pomodoros?: number;
  breakTime: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  estimatePomodoros: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  session: ISession;
  sessionId: string;
}
