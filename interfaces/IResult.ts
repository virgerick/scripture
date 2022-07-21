
export  interface IResult<T>{
  succeded:boolean;
  messages:string[];
  data:T;
}

export  interface IResultList<T>{
  succeded:boolean;
  messages:string[];
  items:T[];
}