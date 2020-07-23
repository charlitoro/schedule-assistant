"use strict";
exports.__esModule = true;
exports.mutationCreateStudent = exports.queryAuthSession = exports.SALT_ROUNDS = exports.API_URL = void 0;
exports.API_URL = 'https://rybk37gvz3.execute-api.us-east-1.amazonaws.com/prod/api';
exports.SALT_ROUNDS = 10;
exports.queryAuthSession = "\nquery ($code: String){\n  student(where:{code: $code}){\n    id code name password\n  }\n}";
exports.mutationCreateStudent = "\nmutation createStudent(\n  $code: String $password: String $name: String $semester: Int $programCode: String\n){\n  createStudent(data:{\n    code:$code name:$name semester:$semester password:$password\n    program:{connect:{code:$programCode}}\n    planner:{create:{name: \"Personal\" description: \"Personal Planner Schedule\"}}\n  }){\n    id\n  }\n}";
//# sourceMappingURL=commons.js.map