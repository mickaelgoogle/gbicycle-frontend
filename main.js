// Import the required libraries
const express = require('express');
const path = require('path');
const fetchdata = require('./fetch_entity').fetchData;
// Initialize a new Express application
const app = express();

// Define the port to listen on
const port = process.env.PORT || 8080;

// Define a route to serve the index.html file
app.get('/', async (req, res) => {
    const bicycleId = req.query.session_id;
    const data = await fetchdata();
    console.log("userId", data.userId);
    if (bicycleId === undefined) {
        res.sendFile(path.join(__dirname, 'invalid_argument.html'));
    }
    else if (data.pedal && data.userId === bicycleId) {
        res.sendFile(path.join(__dirname, 'roule.html'));
    }
    else if (data.userId === bicycleId) {
        res.sendFile(path.join(__dirname, 'no_movement.html'));
    }
    else {
        res.sendFile(path.join(__dirname, 'bicyle_does_not_exist.html'));
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
