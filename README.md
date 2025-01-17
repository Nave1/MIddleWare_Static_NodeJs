## Description

The project contains static pages, an image, a style file, and a script file.
_All routes_ to these files are described **manually**.

## Task
1. download the project
2. install dependencies
```
npm install
```
4. run the project
5. comment out the following code:
   ```
   app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    })
    app.get('/style.css', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'style.css'));
    });
    app.get('/js.js', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'js.js'));
    });
    app.get('/1.jpg', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', '1.jpg'));
    });
   ```
6. add the following code:
   ```
   app.use(express.static(path.join(__dirname, 'public')));
   ```
7. run the project
   

