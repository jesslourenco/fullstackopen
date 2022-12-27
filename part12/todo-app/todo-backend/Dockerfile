FROM node:16  

WORKDIR /usr/src/todo-app  

COPY --chown=node:node . .

RUN npm ci 

CMD npm start