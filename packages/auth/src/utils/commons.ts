export const API_URL = 'https://rybk37gvz3.execute-api.us-east-1.amazonaws.com/prod/api';
export const SALT_ROUNDS = 10;

export interface IUserLogin {
    code: string;
    password: string;
}

export interface IUserSignUp {
    code: string;
    name: string;
    programCode: string;
    semester: number;
}

// Queries
// ---------------------------------------------------------------------------
export const queryAuthSession =`
query ($code: String){
  student(where:{code: $code}){
    id code name password
  }
}`;

export const mutationCreateStudent = `
mutation createStudent(
  $code: String $password: String $name: String $semester: Int $programCode: String
){
  createStudent(data:{
    code:$code name:$name semester:$semester password:$password
    program:{connect:{code:$programCode}}
    planner:{create:{name: "Personal" description: "Personal Planner Schedule"}}
  }){
    id
  }
}`
