import puppeteer from 'puppeteer';
import jwt from 'jsonwebtoken';
import * as db from '@lems/database';

export const getLemsWebpageAsPdf = async (url: string) => {
  const user = await db.getUser({ username: 'admin' });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      userId: user._id
    },
    jwtSecret,
    {
      issuer: 'FIRST',
      expiresIn: 60
    }
  );

  await page.setCookie({
    url,
    path: '/',
    name: 'auth-token',
    value: token,
    secure: true,
    httpOnly: true
  });

  await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });
  const data = await page.pdf({
    format: 'A4',
    margin: { top: '0.18in', bottom: '0.18in', right: '0.18in', left: '0.18in' },
    printBackground: true
  });

  await browser.close();
  return data;
};
