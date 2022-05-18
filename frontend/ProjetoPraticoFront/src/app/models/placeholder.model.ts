export class Materias {
public id:string;
public title:string;
public description: string;
public teacherId: number;
public studentsIds: Array<any>;
      
}

export class Topicos {
    public id:string;
    public title:string;
    public description: string;
    public disciplineId: number;
          
}

export class Contents {
    public id:string;
    public title:string;
    public description: string;
    public disciplineId: number;
    public topicId: number;
          
}