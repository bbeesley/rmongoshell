dbGetMatches <- function(host, db, collection, query, fields, mem = 2) {
  memSize = mem * 1024
  commandBits = c('node --max-old-space-size=', as.character(memSize),
                  ' inst/getMatches.js',
                  ' --host ', host,
                  ' --db ', db,
                  ' --collection ', collection,
                  ' --query \'', query,
                  '\' --fields \'', fields, '\'')
  response = system(paste(commandBits, collapse = ''), intern = T)
  # fromJSON(response, encoding = "UTF-8")
  lapply(response, fromJSON)
}