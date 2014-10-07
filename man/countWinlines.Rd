\name{dbCountWinlines}
\alias{dbCountWinlines}
\title{
Count Winlines
}
\description{
Count winlines by stake and reelset from a mongodb collection.
}
\usage{
dbCountWinlines(host, db, collection, mem = 2)
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
