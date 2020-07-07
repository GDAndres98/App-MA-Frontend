// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url = "http://localhost:8080/";

export const environment = {
  production: false,
  urlvalidatedUser: url + "validatedUser",
  urlStudentCreation: url + "createStudent",
  urlIsAdmin:       url + "isAdmin",
  
  urlGetAllArticles: url + "getAllArticles",
  urlGetSearchArticle: url + "getSearchArticle",
  urlGetAllArticlesPagination: url + "getAllArticlesPagination",
  urldGetArticlesWithTags: url + "getArticlesWithTags",
  urlGetArticleById: url + "getArticleById",

  urlGetProblemById: url + "getProblemById",
  urlGetAllProblemPagination: url + "getAllProblemPagination",
  urlGetAllProblems: url + "getAllProblems", //Provisional FIXME
  urldGetProblemsWithTags: url + "getProblemsWithTags",
  urlGetSearchProblem: url + "getSearchProblem",

  urlGetAllTags: url + "getAllTags",
  
  urlGetUserCourses: url + "getAllUserCoursesById",
  urlGetSectionFromCourse: url + "getSectionsByCourseId",
  urlGetSectionById: url + "getSectionById",

  urlGetPostsFromCourse: url + "getPostsFromCourse",
  urlGetPostById: url + "getPostById",
  urlGetSubPostFromPost: url + "getSubPostFromPost",
  urlCreatePost: url + "createPost",
  urlCreateSubPost: url + "createSubPost",

  urlGetContestStatsById: url + "getContestStatsById",
  urlGetAllProblemsFromContest: url + "getAllProblemsFromContest",
  urlGetScoreboard: url + "getScoreboard",
  urlGetContestById:  url + "getContestById",
  urlGetRunningContests: url + "getRunningContests",
  urlGetFutureContests: url + "getFutureContests",
  urlGetPastContests: url + "getPastContests",

  urlSubmit: url + "submit",
  urlGetAllSubmits: url + "getAllSubmits",
  urlGetUserSubmit: url + "getUserSubmits",
  urlGetContestSubmits: url + "getContestSubmits",
  urlGetSourceCode: url + "getSourceCode",
  utlGetLastProblemAttempt: url + "getLastProblemAttempt",


  // ADMIN

  urlCreateArticle: url + "createArticle",
  urlUpdateArticle: url + "updateArticle",
  urlDeleteArticle: url + "deleteArticle",

  urlCreateProblem: url + "createProblem",
  urlUpdateProblem: url + "updateProblem",
  urlDeleteProblem: url + "removeProblem",
  
  urlGetProfesorById: url + "getProfesorById",
  urlCreateCourse   : url + "createCourse",
  urlGetCourseById  : url + "getCourseById",
  urlUpdateCourse   : url + "editCourse",
  urlGetStudentsCourse      : url + "getCourseStudentsById",
  urlGetStudentsById        : url + "getStudentById",
  urlAddStudentToCourse     : url + "addStudentToCourse",
  urlRemoveStudentToCourse  : url + "removeStudentToCourse",
  
  urlCreateContest    : url + "createContest",
  urlEditContest      : url + "editContest",
  urlDeleteContest    : url + "deleteContest",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.