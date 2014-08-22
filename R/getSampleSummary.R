.onLoad <- function(libname, pkgname) {
  MONGO.path <- find.package("rmongoshell")
  local.nodepath <- file.path("/node/")
  MONGO.nodepath <- paste(MONGO.path, local.nodepath, sep = "")
  assign("MONGO.nodepath", MONGO.nodepath, envir=topenv())
}
dbSummary <- function(host, db, collection, stakeKey, winKey, numLines, mem = 2) {
  memSize = mem * 1024
  commandBits = c('node --max-old-space-size=', as.character(memSize),
                  ' ', MONGO.nodepath, '/getSampleSummary.js',
                  ' --host ', host,
                  ' --db ', db,
                  ' --collection ', collection,
                  ' --stakeKey \'', stakeKey,
                  ' --winKey \'', winKey,
                  '\' --numLines \'', numLines, '\'')
  response = system(paste(commandBits, collapse = ''), intern = T)
  # fromJSON(response, encoding = "UTF-8")
  lapply(response, fromJSON)
}
