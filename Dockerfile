FROM node:20-alpine

#Create a directory for the application and set ownership to the 'node' user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app


WORKDIR /home/node/app


COPY package*.json ./


# USER node

#install dependencies
RUN npm install

# COPY --chown=node:node . .
COPY . .

#Expose port 8000 for the application to communicate
EXPOSE 8000

CMD [ "node", "server.js" ]