import path from 'path';
import express from 'express';

const PORT = process.env.PORT || 4000;
const app = express();
const pathToApp = path.resolve(__dirname, './www');

// Have Node serve the files for our built React app
app.use(express.static(pathToApp));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(pathToApp + '/index.html');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
