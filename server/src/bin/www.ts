import app = require('../index');

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
