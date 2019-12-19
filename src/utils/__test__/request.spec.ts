import FetchRequest, { FetchResponseError } from '../request'

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json() {
      return {}
    },
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Request GET', function () {

  it('should implement GET method', async function () {
    const request = new FetchRequest()
    await request.get('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'GET',
    }))
  })

  it('should can set prefix of request url with global', async function () {
    const request = new FetchRequest({ prefix: '/prefix' })
    await request.get('/path')

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('should can be set prefix of request url with single request', async function () {
    const request = new FetchRequest()
    await request.get('/path', { prefix: '/prefix' })

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('can be convert query object to query string in request url', async function () {
    const request = new FetchRequest()
    await request.get('/path', { params: { foo: 'bar' } })

    expect(global.fetch).toBeCalledWith('/path?foo=bar', expect.any(Object))
  })

  it('should converted response body to json', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json() {
        return {
          foo: 'bar',
        }
      },
    })
    const request = new FetchRequest()
    const response = await request.get('/path')

    expect(response).toMatchObject({ foo: 'bar' })
  })

  it('should throw Error with response when request status code is not 2xx', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 400,
      statusText: 'Bad request',
      json() {
        return {}
      },
    })

    const request = new FetchRequest()

    await expect(request.get('/path'))
      .rejects
      .toThrowError(new FetchResponseError(`Bad request`, expect.any(Object)))
  })
})

describe('# Request POST', function () {

  it('should implement POST method', async function () {
    const request = new FetchRequest()
    await request.post('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'POST',
    }))
  })

  it('should can set prefix of request url with global', async function () {
    const request = new FetchRequest({ prefix: '/prefix' })
    await request.post('/path')

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('should can be set prefix of request url with single request', async function () {
    const request = new FetchRequest()
    await request.post('/path', {}, { prefix: '/prefix' })

    expect(global.fetch).toBeCalledWith('/prefix/path', expect.any(Object))
  })

  it('should can be send json data in request body', async function () {
    const request = new FetchRequest()
    await request.post('/path', { foo: 'bar' })

    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      body: JSON.stringify({ foo: 'bar' }),
    }))
  })

  it('can be convert query object to query string in request url', async function () {
    const request = new FetchRequest()
    await request.post('/path', {}, { params: { foo: 'bar' } })

    expect(global.fetch).toBeCalledWith('/path?foo=bar', expect.any(Object))
  })

  it('should converted response body to json', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json() {
        return {
          foo: 'bar',
        }
      },
    })
    const request = new FetchRequest()
    const response = await request.post('/path')

    expect(response).toMatchObject({ foo: 'bar' })
  })

  it('should throw Error with response when request status code is not 2xx', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 400,
      statusText: 'Bad request',
      json() {
        return {}
      },
    })

    const request = new FetchRequest()

    await expect(request.post('/path'))
      .rejects
      .toThrowError(new FetchResponseError(`Bad request`, expect.any(Object)))
  })
})

describe('# Request DELETE', function () {
  it('should implement DELETE method', async function () {
    const request = new FetchRequest()
    await request.delete('/path')

    expect(global.fetch).toBeCalledTimes(1)
    expect(global.fetch).toBeCalledWith('/path', expect.objectContaining({
      method: 'DELETE',
    }))

  })
})
