\name{dbSummary}
\alias{dbSummary}
\title{
Get Sample Summary
}
\description{
Connect to a mongodb server and collect sample size and RTP data.
}
\usage{
dbSummary(host, db, collection, stakeKey, winKey, numLines, mem = 2)
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
  \item{stakeKey}{
  A character string representing the field name for the stake.
  }
  \item{winKey}{
  A character string representing the field name for the winnings.
  }
  \item{numLines}{
  An integer indicating the number of lines the stake figure should be multiplied over.
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
