import axios, { AxiosError } from 'axios';
import api_key from '../../api_key.json';
import type { List } from '../typing/sheet';
import type { ApiController } from '@/typing/api';
import { generateJson } from '@/utils/sheet';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: 'api_key.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const spreadsheetId = api_key.spreadsheetId;

export const getComment: ApiController<Promise<void>> = async (req, res) => {

  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  const {id} = req.query;

  try {
    const {data: {values}}  = await googleSheet.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:D',
    });

    let data: List[] = generateJson(values as string[][]);

    if(id) {
      data = data.filter((item) => item.id === id);
    }
    res.status(200).json({ data });
  } catch (err) {
    const { message: msg } = err as unknown as AxiosError;
    res.status(500).send({ msg });
  }
};

export const addComment: ApiController<Promise<void>> = async (req, res) => {
  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });

  const {body} : {body: List} = req;
  const {id, comment, name, date} = body;

  try {
    const response = await googleSheet.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[id, name, comment, date]]
      }
    });
    res.send({ message: response });
  } catch (err) {
    const { message: msg } = err as unknown as AxiosError;
    res.status(500).send({ msg });
  }
};
