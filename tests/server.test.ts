import supertest from 'supertest'
import { app } from '../src/server'
import { restoreDb, populateDb } from './utils.js'
import { whispers, inventedId, existingId } from './fixtures.js'
import { getById } from '../src/store'
import { describe } from 'node:test'

const request = supertest(app)

describe('Server API Tests', () => {
  beforeEach(() => populateDb(whispers))
  afterAll(restoreDb)

  describe('GET /api/v1/whisper', () => {
    it("Should return an empty array when there's no data", async () => {
      restoreDb()
      const response = await request.get('/api/v1/whisper')
      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })

    it('Should return all the whispers', async () => {
      const response = await request.get('/api/v1/whisper')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(whispers)
    })
  })

  describe('GET /api/v1/whisper/:id', () => {
    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await request.get(`/api/v1/whisper/${inventedId}`)
      expect(response.status).toBe(404)
    })

    it('Should return whisper details', async () => {
      const response = await request.get(`/api/v1/whisper/${existingId}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(whispers[0])
    })
  })

  describe('POST /api/v1/whisper', () => {
    it('Should return a 400 when the body is empty', async () => {
      const response = await request
        .post('/api/v1/whisper')
        .send({})
      expect(response.status).toBe(400)
    })

    it('Should return a 400 when the message is missing', async () => {
      const response = await request
        .post('/api/v1/whisper')
        .send({ otherField: 'value' })
      expect(response.status).toBe(400)
    })

    it('Should return a 201 when the whisper is created', async () => {
      const newMessage = 'New test message'
      const response = await request
        .post('/api/v1/whisper')
        .send({ message: newMessage })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: whispers.length + 1,
        message: newMessage
      })

      // Verify it was actually created
      const createdWhisper = await getById(response.body.id)
      expect(createdWhisper).toEqual(response.body)
    })
  })

  describe('PUT /api/v1/whisper/:id', () => {
    it('Should return a 400 when the body is empty', async () => {
      const response = await request
        .put(`/api/v1/whisper/${existingId}`)
        .send({})
      expect(response.status).toBe(400)
    })

    it('Should return a 400 when the message is missing', async () => {
      const response = await request
        .put(`/api/v1/whisper/${existingId}`)
        .send({ otherField: 'value' })
      expect(response.status).toBe(400)
    })

    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await request
        .put(`/api/v1/whisper/${inventedId}`)
        .send({ message: 'Updated message' })
      expect(response.status).toBe(404)
    })

    it('Should return a 200 when the whisper is updated', async () => {
      const updatedMessage = 'Updated test message'
      const response = await request
        .put(`/api/v1/whisper/${existingId}`)
        .send({ message: updatedMessage })

      expect(response.status).toBe(200)

      // Verify it was actually updated
      const updatedWhisper = await getById(existingId)
      expect(updatedWhisper).toEqual({
        id: existingId,
        message: updatedMessage
      })
    })
  })

  describe('DELETE /api/v1/whisper/:id', () => {
    it("Should return a 404 when the whisper doesn't exist", async () => {
      const response = await request.delete(`/api/v1/whisper/${inventedId}`)
      expect(response.status).toBe(404)
    })

    it('Should return a 200 when the whisper is deleted', async () => {
      const response = await request.delete(`/api/v1/whisper/${existingId}`)
      expect(response.status).toBe(200)

      // Verify it was actually deleted
      const deletedWhisper = await getById(existingId)
      expect(deletedWhisper).toBeUndefined()
    })
  })
})
