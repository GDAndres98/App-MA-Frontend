// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url = "http://localhost:8080/";

export const environment = {
  production: false,
  urlvalidatedUser:   url + "validatedUser",
  urlStudentCreation: url + "createStudent",
  
  urlGetAllArticles:            url + "getAllArticles",
  urlGetSearchArticle:          url + "getSearchArticle",
  urlGetAllArticlesPagination:  url + "getAllArticlesPagination",
  urldGetArticlesWithTags:      url + "getArticlesWithTags",
  urlGetArticleById:            url + "getArticleById",
  
  urlGetProblemById:          url + "getProblemById",
  urlGetAllProblemPagination: url + "getAllProblemPagination",
  urlGetAllProblems:          url + "getAllProblems", //Provisional FIXME
  urldGetProblemsWithTags:    url + "getProblemsWithTags",
  urlGetSearchProblem:        url + "getSearchProblem",
  
  urlGetAllTags: url + "getAllTags",
  
  urlGetUserCourses:        url + "getAllUserCoursesById",
  urlGetSectionFromCourse:  url + "getSectionsByCourseId",
  urlGetSectionById:        url + "getSectionById",
  
  urlGetPostsFromCourse:  url + "getPostsFromCourse",
  urlGetPostById:         url + "getPostById",
  urlGetSubPostFromPost:  url + "getSubPostFromPost",
  urlCreatePost:          url + "createPost",
  urlCreateSubPost:       url + "createSubPost",
  
  urlGetContestPreviewById:     url + "getContestPreviewById",
  urlGetContestById:            url + "getContestById",
  urlGetContestStatsById:       url + "getContestStatsById",
  urlGetAllProblemsFromContest: url + "getAllProblemsFromContest",
  urlGetScoreboard:             url + "getScoreboard",
  urlGetRunningContests:        url + "getRunningContests",
  urlGetFutureContests:         url + "getFutureContests",
  urlGetPastContests:           url + "getPastContests",
  urlGetSolvedProblems:         url + "getSolvedProblems",
  
  urlSubmit:                  url + "submit",
  urlGetAllSubmits:           url + "getAllSubmits",
  urlGetUserSubmit:           url + "getUserSubmits",
  urlGetSubmitsByUserContest: url + "getSubmitsByUserContest",
  urlGetContestSubmits:       url + "getContestSubmits",
  urlGetSourceCode:           url + "getSourceCode",
  utlGetLastProblemAttempt:   url + "getLastProblemAttempt",

  urlGetAllLevels:      url + "getAllLevels",
  urlGetLevelById:      url + "getLevelById",
  urlGetLevelByUserId:  url + "getLevelByUserId",
  
  
  // ADMIN
  
  urlIsAdmin:       url + "isAdmin",
  
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
  
  urlGetContestAdminById:  url + "getContestAdminById",
  urlCreateContest    : url + "createContest",
  urlEditContest      : url + "editContest",
  urlDeleteContest    : url + "deleteContest",
  
  // PROFESOR
  urlIsProfesor         : url + "isProfesor",
  urlGetProfesorCourses : url + "getProfesorCourseById",
  urlHasCoursePermision : url + "hasCoursePermision",
  urlCreateSection      : url + "createSection",
  urlUpdateOrderSection : url + "setOrderSection",
  urlUpdateSection      : url + "editSection",
  urlDeleteSection      : url + "deleteSection",
  urlAddArticleToSection: url + "addArticleToSection",
  urlRemoveArticleToSection: url + "removeArticleToSection",





  hashCode: "efa0bf84cb475de3e47f2b760bd80e7a",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.