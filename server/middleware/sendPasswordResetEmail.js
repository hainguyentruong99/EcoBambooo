import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = (token, email, name) => {
	const html = `
    <html>
        <body>
          <h3>Dear ${name}</h3>
             <p>Vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu của bạn.</p>
             <a href="http://localhost:3000/password-reset/${token}">Click here!</a>
        </body>
    </html>`;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'ecobamboowrap@gmail.com',
			pass: 'stua nepn hbtu qdjz',
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	const mailOptions = {
		from: 'ecobamboowrap@gmail.com',
		to: email,
		subject: 'Ecobamboo Wrap: Đặt lại yêu cầu mật khẩu của bạn.',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email send to ${email}`);
			console.log(info.response);
		}
	});
};