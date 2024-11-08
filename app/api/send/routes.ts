
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import {EmailTemplate} from '@/app/components/email_template'; 

const resend = new Resend("re_LgNQGkbk_MYkmijYaxa78nN6o5EMkLgWW");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, firstName } = req.body;

      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Hello world",
        react: EmailTemplate({ firstName }),
        text: "",
      });

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}