const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const _ = require('lodash');

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  
  const { body: { user } } = req;
  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).json(info);
  })(req, res, next);
});

router.post('/tasks', auth.optional, (req, res, next) => {
   Users.findById(req.body.user, function (err, user) {
    if (!err) {
      if(!user.tasks) {
        user.tasks = []
      }
      user.tasks.push({task: req.body.task})
      user.save(function (err) {
        return res.json({tasks: user.tasks});
      });
    }
  });
});

router.patch('/tasks/delete', auth.optional, (req, res, next) => {
  Users.findById(req.body.user, function (err, user) {
    if (!err) {
      user.tasks = _.reject(user.tasks, (task) => {
        return task._id == req.body.id;
      });
      user.save(function (err) {
        return res.json({tasks: user.tasks});
      });
    }
  });
});

router.patch('/tasks/update', auth.optional, (req, res, next) => {
  Users.findById(req.body.user, function (err, user) {
    if (!err) {
      user.tasks = _.reject(user.tasks, (task) => {
        return task._id == req.body.id;
      });
      user.save(function (err) {
        return res.json({tasks: user.tasks});
      });
    }
  });
});

//GET current route (required, only authenticated users have access)
router.get('/tasks', auth.optional, (req, res, next) => {
  Users.findOne({_id: req.query.id},function(err, user){
    return res.json({ tasks: user.tasks });
  });
});

module.exports = router;