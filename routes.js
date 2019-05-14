const path = require('path');

module.exports = (app) => {
  app.get('/', async (req, res) => {
    // Show the Create Event page
    res.render(__dirname + '/views/index');
  });

  app.post('/', async (req, res) => {
    // Capture input from Create Event page
    const assignment = await req.api.course.assignment.create({
      name: req.body.eventTitle,
      pointsPossible: 1,
      published: true,
      courseId: req.session.launchInfo.courseId,
    });

    // Redirect user to event page
    res.redirect('/events/' + assignment.id);
  });

  app.get('/events/:id', async (req, res) => {
    // Show Scan to Attend page
    res.render(__dirname + '/views/event');
  });

  app.post('/events/:id', async (req, res) => {
    // Capture input from Scan to Attend page
    req.api.course.assignment.updateGrade({
      courseId: req.session.launchInfo.courseId,
      assignmentId: req.params.id,
      studentId: req.body.studentId,
      points: 1,
    });

    res.redirect('/events/' + req.params.id);
  });
};
