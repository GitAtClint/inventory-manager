FROM node:alpine

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

# FROM node:alpine

# WORKDIR /src/app

# COPY . /src/app/

# RUN npm install

# EXPOSE 8080

# RUN npm install -g nodemon

# CMD ["npm", "start"]