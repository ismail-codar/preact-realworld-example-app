import { generateAuthor } from '../../utils/test-utils'
import { shallow } from 'enzyme'
import Profile from '../Profile'
import { h } from 'preact'
import { deleteFollowProfile, getProfile, postFollowProfile } from '../../services'

jest.mock('../../services')

const getProfileMock = getProfile as jest.Mock<Promise<User>>

beforeEach(() => {
  (getProfile as jest.Mock).mockResolvedValue({})
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Profile Page', function () {
  it('should display correct username', function () {
    const author = generateAuthor()
    const wrapper = shallow(<Profile username={`@${author.username}`} />)

    expect(wrapper.find('.user-info h4').text()).toBe(author.username)
    expect(wrapper.find('.user-info button').text()).toContain(`Follow ${author.username}`)
  })

  it('should trigger fetch method when component did mount', function () {
    jest.spyOn(Profile.prototype, 'fetchProfile')
    const author = generateAuthor()
    const wrapper = shallow<Profile>(<Profile username={`@${author.username}`} />)

    expect(wrapper.instance().fetchProfile).toBeCalledTimes(1)
  })

  it('should be request profile when fetchProfile called', async function () {
    const author = generateAuthor()
    const wrapper = shallow<Profile>(<Profile username={`@${author.username}`} />)
    await wrapper.instance().fetchProfile()

    expect(getProfile).toBeCalledWith(author.username)
  })

  it('should display user profile correctly', async function () {
    const author = generateAuthor()
    getProfileMock.mockResolvedValue(author)

    const wrapper = shallow<Profile>(<Profile username={`@${author.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info p').text()).toBe(author.bio)
    expect(wrapper.find('.user-info .user-img').prop('src')).toBe(author.image)
  })

})

describe('# Follow user', () => {
  it('should display Follow when user is not following', async function () {
    const user = generateAuthor()
    user.following = false
    getProfileMock.mockResolvedValue(user)
    const wrapper = shallow(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info button').text()).toContain('Follow')
  })

  it('should display Unfollow when user is following', async function () {
    const user = generateAuthor()
    user.following = true
    getProfileMock.mockResolvedValue(user)
    const wrapper = shallow(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.user-info button').text()).toContain('Unfollow')
  })

  it('should send follow request when Follow button clicked', async function () {
    const user = generateAuthor()
    getProfileMock.mockResolvedValue({ ...user, following: false })
    const wrapper = shallow<Profile>(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    const postFollowProfileMock = postFollowProfile as jest.Mock<Promise<User>>
    postFollowProfileMock.mockImplementation()
    await wrapper.instance().onFollowUser()

    expect(postFollowProfileMock).toBeCalledTimes(1)
  })

  it('should send unfollow request when Unfollow button clicked', async function () {
    const user = generateAuthor()
    getProfileMock.mockResolvedValue({ ...user, following: true })
    const wrapper = shallow<Profile>(<Profile username={`@${user.username}`} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    const deleteFollowProfileMock = deleteFollowProfile as jest.Mock<Promise<User>>
    deleteFollowProfileMock.mockImplementation()
    await wrapper.instance().onFollowUser()

    expect(deleteFollowProfileMock).toBeCalledTimes(1)
  })
})