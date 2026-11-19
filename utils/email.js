// Uses the free mail.tm API to create a temporary inbox and read the OTP.
// This removes the only manual step in the signup flow.
const API = 'https://api.mail.tm';
const password = 'Temp@12345';

async function createInbox() {
  const domains = await (await fetch(`${API}/domains`)).json();
  const email = `qa${Date.now()}@${domains['hydra:member'][0].domain}`;

  const body = JSON.stringify({ address: email, password });
  const headers = { 'Content-Type': 'application/json' };
  await fetch(`${API}/accounts`, { method: 'POST', headers, body });
  const { token } = await (await fetch(`${API}/token`, { method: 'POST', headers, body })).json();

  return { email, token };
}

async function getOtp(token) {
  const headers = { Authorization: `Bearer ${token}` };

  // Check the inbox every 5 seconds, for up to 2 minutes
  for (let i = 0; i < 24; i++) {
    const list = await (await fetch(`${API}/messages`, { headers })).json();
    if (list['hydra:member'].length > 0) {
      const id = list['hydra:member'][0].id;
      const message = await (await fetch(`${API}/messages/${id}`, { headers })).json();
      const otp = message.text.match(/\d{6}/);
      if (otp) return otp[0];
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error('OTP email not received');
}

module.exports = { createInbox, getOtp };
