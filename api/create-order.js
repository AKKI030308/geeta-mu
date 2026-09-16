import crypto from 'crypto';
import { BASE, MODE, headers, cfg } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    cfg();

    const amount = Number(process.env.EXPECTED_AMOUNT || '199');

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(500).json({
        error: 'Invalid EXPECTED_AMOUNT configuration.'
      });
    }

    const id =
      'creator_' +
      Date.now() +
      '_' +
      crypto.randomBytes(4).toString('hex');

    const siteUrl = String(
      process.env.SITE_URL || 'https://babeekaira.vercel.app'
    ).replace(/\/$/, '');

    const payload = {
      order_id: id,
      order_amount: amount,
      order_currency: 'INR',

      customer_details: {
        customer_id: 'guest_' + id,
        customer_name: 'Guest Customer',
        customer_phone: '9999999999'
      },

      order_meta: {
        return_url: `${siteUrl}/return.html?order_id={order_id}`,
        notify_url: `${siteUrl}/api/webhook`
      }
    };

    const r = await fetch(`${BASE}/orders`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(payload)
    });

    const d = await r.json().catch(() => ({}));

    if (!r.ok || !d.payment_session_id) {
      return res.status(502).json({
        error:
          d.message ||
          d.error ||
          'Cashfree order creation failed.'
      });
    }

    return res.status(200).json({
      order_id: id,
      payment_session_id: d.payment_session_id,
      mode: MODE
    });

  } catch (e) {
    console.error(e);

    return res.status(500).json({
      error: 'Server error while creating payment order.'
    });
  }
}
