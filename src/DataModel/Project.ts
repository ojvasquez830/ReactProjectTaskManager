export class ProjectData {
    title: string;
    description: string;
    date: Date;
    tasks: string[];

    public constructor(title: string, description: string, date: Date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.tasks = [];
    }

    public addTask(task: string) {
        this.tasks.push(task);
    }

    public removeTask(i: number) {
        this.tasks.splice(i, 1);
    }
}