dbCount <- function(host, db, collection, query, mem = 2) {
  memSize = mem * 1024
  commandBits = c('node --max-old-space-size=', as.character(memSize),
                  ' $R_PACKAGE_DIR/node/count.js',
                  ' --host ', host,
                  ' --db ', db,
                  ' --collection ', collection,
                  ' --query \'', query, '\'')
  response = system(paste(commandBits, collapse = ''), intern = T)
  # fromJSON(response, encoding = "UTF-8")
  # lapply(response, fromJSON)
  response
}