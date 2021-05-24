var User = require('../Models/user.model');
exports.ShowRegistration = (req, res) => {
	return res.render('index.ejs');
}
exports.Create = async (req, res) => {
	if (!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf) {
		res.send();
	}
	else {
		if (req.body.password === req.body.passwordConf) {
			const emailCheck = await User.findOne({ email: req.body.email });
			if (emailCheck) {
				res.send({
					"Success": "Email is already used"
				});

			}
			else {
				const users = new User(req.body);
				try {
					await users.save();
					res.send({
						"Success": "Success"
					});
				} catch (error) {
					res.status(500).send(error);
				}
			}
		}
		else {
			res.send({
				"Success": "password is not matched"
			});
		}
	}
}
exports.ShowLogin = (req, res) => {
	return res.render('login.ejs');
}
exports.CheckLogin = async (req, res) => {
	const emailCheck = await User.findOne({ email: req.body.email });

	if (emailCheck) {
		if (emailCheck.password == req.body.password) {
			req.session.userId = emailCheck.unique_id;
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
}
exports.Profile = (req, res) => {
	User.findOne({
		unique_id: req.session.userId
	}, function (err, data) {
		if (!data) {
			res.redirect('/');
		}
		return res.render('data.ejs', {
			"name": data.username,
			"email": data.email
		});
	});
}
exports.LogOut = (req, res) => {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
}
