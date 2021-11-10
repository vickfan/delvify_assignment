export type List = {
    id: number;
    name: string;
};

export type Task = {
    id: number;
    content: string;
    deadline?: Date;
    is_completed: boolean;
};
