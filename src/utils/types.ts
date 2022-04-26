export type ISession = {
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
};

export type ITask = {
  id: string;
  title: string;
  description?: string;
  estimatePomodoros: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  sessionId: string;
};
