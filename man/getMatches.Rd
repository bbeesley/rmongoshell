\name{dbGetMatches}
\alias{dbGetMatches}
\title{
Get Matching Documents for a Query
}
\description{
Connect to a mongodb server, run a query, and return the matching documents (or some fields from the documents).
}
\usage{
dbGetMatches(host, db, collection, query, fields, mem = 2)
}
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
  \item{fields}{
  A character string in JSON form specifying particular fields to retrieve by marking them with a 1, eg \code{'{"cost":1,"position":1}'}
  }
  \item{mem}{
  A number representing the memory, in GB to assign to each query process.
  }
}
\value{
A list, where each element contains a representation of a matching document.
}
\references{
\url{http://mongodb.github.io/node-mongodb-native/}
}
\author{
Bill Beesley \email{bill@billbeesley.com}
}

\seealso{
\code{\link{dbUniques}} to return the unique values of a key, \code{\link{dbCount}} to get the number of documents matching a query.
}
\examples{
  \dontrun{cant run examples without a db server to connect to.}
}
\keyword{ database }
