import { Injectable, Logger } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'handlebars';

@Injectable()
export class AppService {
  constructor(@InjectSendGrid() private readonly client: SendGridService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(email: string, name: string) {
    const html = fs
      .readFileSync(path.join(__dirname, '..', '/templates/index.html'))
      .toString();
    const template = hbs.compile(html),
      htmlToSend = template({ name });
    Logger.debug(html);
    await this.client.send({
      from: {
        name: 'Aegle Health',
        email: 'support@aeglehealth.io',
      },
      to: email,
      subject: 'Welcome to Aegle Health',
      html: htmlToSend,
    });
  }
}
