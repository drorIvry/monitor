FROM node:10

WORKDIR /usr/monitor

COPY ./backend ./backend
COPY ./frontend ./frontend

RUN cd /usr/monitor/frontend && npm install
RUN cd /usr/monitor/backend && npm install
RUN cd /usr/monitor/frontend/ && npm run build 
RUN cd /usr/monitor/backend/ && npm run clean && npm run build
RUN cp -rf /usr/monitor/frontend/build /usr/monitor/backend/dist

EXPOSE 3001
CMD ["node", "/usr/monitor/backend/dist/bin/www.js"]




