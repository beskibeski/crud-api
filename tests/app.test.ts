import request from 'superagent';
import crud_api from '../src/app';
import { users } from '../src/database/users';

const BASE_URL = `http://localhost:3000/api/users`;

const DELETED_UUID = '5f39ac70-a0a5-4b25-8cda-671d74bedf22';

beforeAll(() => {
    crud_api.start();
});
  
describe('API', () => {    
    it('should get all records with status code 200', async () => {
        const res = await request
            .get(BASE_URL);        
        expect(res.body).toEqual([]);
        expect(res.status).toEqual(200);
    })    
    it('should create a new object with status code 201', async () => {
        const res = await request
            .post(BASE_URL)
            .send({
          username: 'Vanya',
          age: 54,
          hobbies: ['swimming']
        });
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username', 'Vanya');
        expect(res.body).toHaveProperty('age', 54);
        expect(res.body).toHaveProperty('hobbies', ['swimming']);
        expect(res.statusCode).toEqual(201);
    });
    it('should get user by id with status code 200', async () => {
        const uuid = '5f39ac70-a0a5-4b25-8cda-671d74bedf26';
        users.push({
            id: uuid,
            username: 'Vanya',
            age: 54,
            hobbies: ['swimming']
        })
        const res = await request
            .get(`${BASE_URL}/${uuid}`);
        expect(res.body).toHaveProperty('username', 'Vanya');
        expect(res.body).toHaveProperty('age', 54);
        expect(res.body).toHaveProperty('hobbies', ['swimming']);
        expect(res.statusCode).toEqual(200);
    });
    it('should update user by id with status code 200', async () => {
        const uuid = '5f39ac70-a0a5-4b25-8cda-671d74bedf24';
        users.push({
            id: uuid,
            username: 'Vasya',
            age: 50,
            hobbies: ['swimming']
        })
        const putRes = await request
            .put(`${BASE_URL}/${uuid}`)
            .send({
                username: 'Vanya',
                age: 54,
                hobbies: ['running']
            });
        expect(putRes.statusCode).toEqual(200);
        const res = await request
            .get(`${BASE_URL}/${uuid}`);
        expect(res.body).toHaveProperty('username', 'Vanya');
        expect(res.body).toHaveProperty('age', 54);
        expect(res.body).toHaveProperty('hobbies', ['running']);        
    });
    it('should delete user by id with status code 204', async () => {        
        users.push({
            id: DELETED_UUID,
            username: 'Vasya',
            age: 50,
            hobbies: ['swimming']
        })
        const res = await request
            .delete(`${BASE_URL}/${DELETED_UUID}`);
        expect(res.statusCode).toEqual(204);
    });
    it('should get status code 404 for deleted user', async () => {
        let errorStatusCode = 0;
        const res = await request
            .get(`${BASE_URL}/${DELETED_UUID}`).catch((error) => {
                errorStatusCode = error.status;
            });
        expect(errorStatusCode).toEqual(404);
    });
})

