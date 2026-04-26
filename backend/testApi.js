import http from 'http';

const reqData = JSON.stringify({
  userId: "69eb9a687f5f8468bd0f8e5b",
  formData: {
    medicalConditions: "Asthma, Hypertension",
    medications: "Inhaler"
  },
  score: 80
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/assessment',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': reqData.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(body));
});

req.on('error', error => console.error(error));
req.write(reqData);
req.end();
