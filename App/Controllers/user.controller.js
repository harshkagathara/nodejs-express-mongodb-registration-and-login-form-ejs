var User = require('../Models/user.model');
exports.ShowRegistration = (req, res) => {
	return res.render('index.ejs');
}
exports.Create = (req, res) => {
	var personInfo = req.body;
	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if(personInfo.password == personInfo.passwordConf) {
			User.findOne({
				email: personInfo.email
			}, function(err, data) {
				if(!data) {
					var c;
					User.findOne({}, function(err, data) {
						if(data) {
							c = data.unique_id + 1;
						} else {
							c = 1;
						}
						var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});
						newPerson.save(function(err, Person) {
							if(err) console.log(err);
							else console.log('Success');
						});
					}).sort({
						_id: -1
					}).limit(1);
					res.send({
						"Success": "You are regestered,You can login now."
					});
				} else {
					res.send({
						"Success": "Email is already used."
					});
				}
			});
		} else {
			res.send({
				"Success": "password is not matched"
			});
		}
	}
}
exports.ShowLogin = (req, res) => {
	return res.render('login.ejs');
}
exports.CheckLogin = (req, res) => {
	User.findOne({
		email: req.body.email
	}, function(err, data) {
		if(data) {
			if(data.password == req.body.password) {
				req.session.userId = data.unique_id;
				res.send({
					"Success": "Success!"
				});
			} else {
				res.send({
					"Success": "Wrong password!"
				});
			}
		} else {
			res.send({
				"Success": "This Email Is not regestered!"
			});
		}
	});
}
exports.Profile = (req, res) => {
	User.findOne({
		unique_id: req.session.userId
	}, function(err, data) {
		if(!data) {
			res.redirect('/');
		}
		return res.render('data.ejs', {
			"name": data.username,
			"email": data.email
		});
	});
}
exports.LogOut = (req, res) => {
	if(req.session) {
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
}