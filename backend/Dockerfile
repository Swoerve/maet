FROM node
COPY . /backend
WORKDIR /backend
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
