import bull from 'bull';
import mailer from './mailer';

const queue = new bull('EmailJobs', 'redis://127.0.0.1:6379')

queue.process(function (job, done) {
  const { data } = job;

  mailer.sendMail({
    from: process.env.FROM || 'from@example.com', // sender address
    to: data.to.join(','), // list of receivers
    subject: data.subject, // subject line
    html: data.body, // html body
  });

  done();
});

export default queue;