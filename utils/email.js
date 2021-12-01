const nodemailer = require('nodemailer')
const pug = require('pug')
const { convert } = require('html-to-text')

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email
    this.firstName = user.name.split(' ')[0]
    this.url = url
    this.from = `Ashaka <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.MJSMTP,
        port: process.env.MJPORT,
        auth: {
          user: process.env.MJUSERNAME,
          pass: process.env.MJPASSWORD,
        },
      })
    }
    return nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EPORT,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    })
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    })

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, {
        wordwrap: 130,
      }),
    }

    await this.newTransport().sendMail(mailOptions)
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to to Natours')
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    )
  }
}
