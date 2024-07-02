const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false,
  auth: {
    user: "linlingqin77@qq.com",
    pass: "xxx",
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"林北" <linlingqin77@qq.com>',
    to: "linlingqin88@qq.com",
    subject: "Hello 111", //标题
    text: "xxxxx", //文本内容
    html: fs.readFileSync("./test.html"),
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
