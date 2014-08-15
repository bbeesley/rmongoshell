\name{dbCount}
\alias{dbCount}
\title{
Count documents which match a query.
}
\description{
Connects to mongo, selects the db, then counts documents in the selected collection which match the query.
}
\usage{
dbCount(host, db, collection, query, mem = 2)
}
%- maybe also 'usage' for other objects documented here.
\arguments{
  \item{host}{
  The hostname or IP for the mongodb server, including the port if required, as a character string, eg "10.1.21.48:27017".
  }
  \item{db}{
  The database to use for the query, passed as a character string.
  }
  \item{collection}{
  The name of the collection to query, passed as a character string.
  }
  \item{query}{
  A character string representing the JSON query to pass to mongod, eg \code{'{"cost":10,"location":"UK"}'}
  }
  \item{mem}{
  A number representing the memory, in GB to assign to each query process.
  }
}
\value{
A numeric vector of length one representing the number of matching documents.
}
\author{
Bill Beesley \email{bill@billbeesley.com}
}
\references{
\url{http://mongodb.github.io/node-mongodb-native/}
}
\keyword{ database }
\seealso{
\code{\link{dbUniques}} to return the unique values of a key, \code{\link{dbGetMatches}} to retrieve the matching records for a query.
}  
\examples{
\dontrun{cant run examples without a db server to connect to.}
}
\keyword{ database }
