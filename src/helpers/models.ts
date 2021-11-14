export type List = {
    id: number;
    name: string;
};

export type Task = {
    id: number;
    name: string;
    description: string;
    deadline?: string | null;
    is_completed: boolean;
};
