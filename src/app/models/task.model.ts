export interface Task{
  id:string,
  title:string,
  descriPtion?:string,
  completed:boolean,
  priority:'low'|'medium'|'high',
  category:string,
  dueDate?:Date,
  createdAt:Date
}
