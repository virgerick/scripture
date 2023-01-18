
export  interface IResult<T>{
  succeeded:boolean;
  messages:string[];
  data:T;
}

export  interface IResultList<T>{
  succeeded:boolean;
  messages:string[];
  items:T[];
}