import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import truncate from '../util/trucate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const res = await request(app)
      .post('/users')
      .send(user);

    expect(res.body).toHaveProperty('id');
  });

  it('should not be able to regegister with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const res = await request(app)
      .post('/users')
      .send(user);

    expect(res.status).toBe(400);
  });
});
