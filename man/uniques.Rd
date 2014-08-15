\name{dbUniques}
\alias{dbUniques}
\title{
Get the Unique Values of a Field
}
\description{
Connects to mongo, selects the db, finds all values of the field passed as a parameter, then returns the unique values.
}
\usage{
dbUniques(host, db, collection, property, mem = 2)
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
  \item{property}{
  A character string representing the field to interrogate, eg \code{'jackpotWins'}.
  }
  \item{mem}{
  A number representing the memory, in GB to assign to each query process.
  }
}
\value{
A list, or if possible a vector produced by simplifying the list, containing the unique values of the field.
}
\author{
Bill Beesley \email{bill@billbeesley.com}
}
\references{
\url{http://mongodb.github.io/node-mongodb-native/}
}
\keyword{ database }
\seealso{
\code{\link{dbCount}} to get the number of documents matching a query, \code{\link{dbGetMatches}} to retrieve the matching records for a query.
}  
\examples{
\dontrun{cant run examples without a db server to connect to.}
}
\keyword{ database }
