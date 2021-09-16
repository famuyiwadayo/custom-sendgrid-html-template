import { Controller, Get, Res, Render, Post, Param } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('index', {
      confirmationLink: 'https://www.genera.finance/?ref=DtuEy&7',
      referrerLink: 'https://www.genera.finance/?ref=DtuEy&7',
      name: 'Grace',
      customer_name: 'Grace',
    });
  }

  @Post(':email')
  async sendEmail(@Param('email') email: string) {
    console.log(email);
    await this.appService.sendEmail(email, 'Dayo Famuyiwa');
  }
}
