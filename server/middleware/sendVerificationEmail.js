import nodemailer from 'nodemailer';
// stua nepn hbtu qdjz
// ecobamboowrap@gmail.com
export const sendVerificationEmail = (token, email, name) => {
	const html = `
    <html>
        <body>
            <h3>Dear ${name}</h3>
            <p>Cảm ơn bạn đã đăng ký tại Ecobambooo!</p>
            <p>Sử dụng liên kết dưới đây để xác minh email của bạn</p>
            <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
        </body>
    </html>
    `;

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
		subject: 'Xác minh địa chỉ email của bạn',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(`Error ${error}`);
		} else {
			console.log(`Email send to ${email}`);
			console.log(info.response);
		}
	});
};