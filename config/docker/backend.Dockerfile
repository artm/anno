FROM ruby:2.2.6

ENV COUCHBASE_DEB couchbase-release-1.0-2-amd64.deb

RUN wget -q "http://packages.couchbase.com/releases/couchbase-release/$COUCHBASE_DEB" \
  && apt-get update -qq \
  && apt-get install -y --no-install-recommends lsb-release \
  && dpkg -i $COUCHBASE_DEB \
  && apt-get update -qq \
  && apt-get install -y --no-install-recommends \
      build-essential \
      nodejs nodejs-legacy \
      libcouchbase-dev libcouchbase2-bin \
      libxml2-dev libxslt1-dev \
  && rm -rf /var/lib/apt/lists/*

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY Gemfile* $APP_HOME/
ENV BUNDLE_JOBS=2 BUNDLE_PATH=/bundle
RUN bundle install

COPY . $APP_HOME

CMD ["bin/rails", "server", "-p", "3000", "-b", "0.0.0.0"]

# vim:ft=Dockerfile:
