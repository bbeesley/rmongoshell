dbUniques <- function(host, db, collection, property, mem = 2) {
  memSize = mem * 1024
  commandBits = c('node --max-old-space-size=', as.character(memSize),
                  ' $R_PACKAGE_DIR/node/uniques.js',
              ' --host ', host,
              ' --db ', db,
              ' --collection ', collection,
              ' --property ', property)
  response = system(paste(commandBits, collapse = ''), intern = T)
  fromJSON(response)
}