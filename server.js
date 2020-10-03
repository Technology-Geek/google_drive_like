/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');

//Database
const db = require('./database');

//Configuration Keys
const { PORT } = require('./configuration/config');

//Routes
const userRoute = require('./app/user/userRoute');
const folderRoute = require('./app/folder/folderRoute');
const fileRoute = require('./app/file/fileRoute');

const app = express();

app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.user = { id: 1 };
  next();
});
app.use('/file', fileRoute);
app.use('/folder', folderRoute);
app.use('/user', userRoute);
app.use('*', (req, res) => res.sendStatus(404));

db.connect((err) =>
  err
    ? console.log('DB Connection Error!!!')
    : console.log('DB Connected...') &
      app.listen(PORT, () => {
        console.log(`Server Running On PORT: ${PORT}`);
      })
);
