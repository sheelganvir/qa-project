import { test, expect } from '@playwright/test';

test('TC05 API health check', { tag: ['@sanity', '@regression'] }, async ({ request }) => {
  const res = await request.get('/ping');
  expect(res.status()).toBe(201);
});

test('TC06 get all bookings', { tag: '@regression' }, async ({ request }) => {
  const res = await request.get('/booking');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.length).toBeGreaterThan(0);
});

test('TC07 create, get and delete a booking', { tag: '@regression' }, async ({ request }) => {
  const payload = {
    firstname: 'Sheel',
    lastname: 'Tester',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Breakfast',
  };

  // Create
  const createRes = await request.post('/booking', { data: payload });
  expect(createRes.status()).toBe(200);
  const { bookingid, booking } = await createRes.json();
  expect(booking.firstname).toBe('Sheel');

  // Read
  const getRes = await request.get(`/booking/${bookingid}`);
  expect(getRes.status()).toBe(200);

  // Auth (get token)
  const authRes = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  const { token } = await authRes.json();
  expect(token).toBeTruthy();

  // Delete (needs token as a cookie)
  const delRes = await request.delete(`/booking/${bookingid}`, {
    headers: { Cookie: `token=${token}` },
  });
  expect(delRes.status()).toBe(201);
});
