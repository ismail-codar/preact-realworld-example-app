import FetchRequest from '../utils/request'
import { deleteComment, getArticles, getCommentsByArticle, postArticle, postLogin, postRegister } from '../services'
import { generateArticles, generateComments } from '../utils/test-utils'

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Service', function () {

  test('login', async function () {
    const form = {
      email: 'test@example.com',
      password: '12345678',
    }
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ user: form })
    const user = await postLogin(form)

    expect(user).toMatchObject(form)
  })

  test('register', async function () {
    const form = {
      email: 'test@example.com',
      password: '12345678',
      username: 'test',
    }
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ user: form })
    const user = await postRegister(form)

    expect(user).toMatchObject(form)
  })

  test('create article', async function () {
    const form = {
      title: 'title',
      description: 'description',
      body: 'body',
      tagList: [ 'dragons', 'training' ],
    }
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ article: form })
    const article = await postArticle(form)

    expect(article).toMatchObject(form)
  })

  test('get article', async function () {
    const articles = generateArticles(2)
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ articles, articlesCount: 2 })
    const result = await getArticles()

    expect(FetchRequest.prototype.get).toBeCalledTimes(1)
    expect(FetchRequest.prototype.get).toBeCalledWith('/articles', { params: { offset: 0, limit: 10 } })
    expect(result).toHaveProperty('articles')
    expect(result).toHaveProperty('articlesCount')
  })

  test('get article by author', async function () {
    const articles = generateArticles(2)
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ articles, articlesCount: 2 })
    const response = await getArticles(1, 'foo')

    expect(FetchRequest.prototype.get).toBeCalledTimes(1)
    expect(FetchRequest.prototype.get).toBeCalledWith('/articles', { params: { offset: 0, limit: 10, author: 'foo' } })
    expect(response).toHaveProperty('articles')
    expect(response).toHaveProperty('articlesCount')
  })

  test('get comments by article', async function () {
    const comments = generateComments(2)
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ comments })
    const result = await getCommentsByArticle('slug')

    expect(FetchRequest.prototype.get).toBeCalledWith('/articles/slug/comments')
    expect(result).toHaveLength(2)
  })

  test('delete comments', async function () {
    jest.spyOn(FetchRequest.prototype, 'delete').mockResolvedValue({})
    await deleteComment('slug', 1)

    expect(FetchRequest.prototype.delete).toBeCalledWith('/articles/slug/comments/1')
  })
})
