export type List = {
    id: number;
    name: string;
};

export type Task = {
    id: number;
    name: string;
    description: string;
    deadline?: Date;
    is_completed: boolean;
};
