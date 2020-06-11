// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlvalidatedUser : "http://localhost:8080/validatedUser",
  urlStudentCreation : "http://localhost:8080/createStudent",
  urlGetAllArticles: "http://localhost:8080/getAllArticles",
  urlGetSearchArticle : "http://localhost:8080/getSearchArticle",
  urlGetAllArticlesPagination: "http://localhost:8080/getAllArticlesPagination",
  urlGetArticleById: "http://localhost:8080/getArticleById",
  urlGetProblemById: "http://localhost:8080/getProblemById",
  urlGetAllProblemPagination: "http://localhost:8080/getAllProblemPagination",
  urlGetSearchProblem : "http://localhost:8080/getSearchProblem",
  urlGetAllTags: "http://localhost:8080/getAllTags",


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
