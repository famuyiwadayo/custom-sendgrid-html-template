import { Injectable, Logger } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'handlebars';

const link =
  'http://www.yodahealth.io/email/verify/4?expires=1572011996&signature=3f5b6e822c00445b5e9e6a3e0dc3945f9b34b128eb6c7c72693330b57b15b644';
@Injectable()
export class AppService {
  constructor(@InjectSendGrid() private readonly client: SendGridService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(email: string, name: string) {
    const html = fs
      .readFileSync(path.join(__dirname, '..', '/templates/bitmama-debit.html'))
      .toString();
    const template = hbs.compile(html),
      htmlToSend = template({ name, amount: 'N2,500.00', reference: 'FLC230621382e11880a', date: '23 Jun 2021 20:22:00', link: 'http://www.famuyiwadayo.com' });
    // Logger.debug(html);
    await this.client.send({
      from: {
        name: 'Bitmama',
        email: 'support@bitmama.io',
      },
      to: email,
      subject: 'Credit Alert',
      html: htmlToSend,
    });
  }
}
