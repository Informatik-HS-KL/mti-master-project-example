FROM node:14

# Create app directory
WORKDIR .

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY generator.js .

#Run the generator
CMD [ "node", "generator.js" ]