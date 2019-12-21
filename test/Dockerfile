FROM nodered/node-red:latest

USER node-red

# Install the required test frameworks
RUN mkdir /usr/src/node-red/node-red-contrib-vestel-tv && cd /usr/src/node-red/node-red-contrib-vestel-tv && npm install node-red-node-test-helper mocha

# Copy the package files
COPY --chown=node-red:node-red package.json /usr/src/node-red/node-red-contrib-vestel-tv/
COPY --chown=node-red:node-red LICENSE /usr/src/node-red/node-red-contrib-vestel-tv/
COPY --chown=node-red:node-red README.md /usr/src/node-red/node-red-contrib-vestel-tv/
COPY --chown=node-red:node-red nodes /usr/src/node-red/node-red-contrib-vestel-tv/nodes/
COPY --chown=node-red:node-red test /usr/src/node-red/node-red-contrib-vestel-tv/test/

# Just install the local package please...
RUN cd /usr/src/node-red && npm install --prefer-offline --no-audit node-red-contrib-vestel-tv

# Disable checking updates for npm....
ENV NO_UPDATE_NOTIFIER because_npm_is_painfully_slow

# Then run tests
ENTRYPOINT cd /usr/src/node-red/node-red-contrib-vestel-tv  &&  npm test
