.onLoad <- function(libname, pkgname) {
  MONGO.path <- find.package("rmongoshell")
  local.nodepath <- file.path("/node/")
  MONGO.nodepath <- paste(MONGO.path, local.nodepath, sep = "")
  assign("MONGO.nodepath", MONGO.nodepath, envir=topenv())
}

dbUniques <- function(host, db, collection, property, mem = 2) {
  memSize = mem * 1024
  commandBits = c('node --max-old-space-size=', as.character(memSize),
                  ' ', MONGO.nodepath, '/uniques.js',
                  ' --host ', host,
                  ' --db ', db,
                  ' --collection ', collection,
                  ' --property ', property)
  response = system(paste(commandBits, collapse = ''), intern = T)
  fromJSON(response)
}
