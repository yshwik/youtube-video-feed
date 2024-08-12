const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'AIzaSyDvO1NZp_cxWwmxIbVkDVtIpCcXBjwrxPA';
const MAX_RESULTS = 50;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&q=bitcoin&type=video&key=${API_KEY}';

app.use(express.static('public'));

app.get('/videos', async (req, res) => {
    let url = BASE_URL;
    let allVideos = [];

    while (url) {
        try {
            const response = await axios.get(url);
            const data = response.data;
            allVideos = allVideos.concat(data.items);

            const nextPageToken = data.nextPageToken;
            if (nextPageToken) {
                url = '${BASE_URL}&pageToken=${nextPageToken}';
            } else {
                break;
            }
        } catch (error) {
            console.error(error);
            break;
        }
    }

    res.json(allVideos);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

