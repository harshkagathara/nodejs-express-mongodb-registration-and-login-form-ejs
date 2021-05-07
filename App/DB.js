var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ourdata', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if(!err) {
		console.log('MongoDB Connection Succeeded.');
	} else {
		console.log('Error in DB connection : ' + err);
	}
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});