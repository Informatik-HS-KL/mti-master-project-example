FROM node:14

# Create app directory
WORKDIR .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#Run the mqtt2influx app
CMD [ "node", "index.js" ]