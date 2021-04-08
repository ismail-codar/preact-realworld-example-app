import { h } from 'preact';
import { route } from 'preact-router';
import { mount, shallow } from 'enzyme';

import Login from '../../src/pages/Login';
import { postLogin } from '../../src/services';
import { setInputValue } from '../utils/test-utils';
import { useRootState } from '../../src/store';
import { login } from '../../src/store/actions';

jest.mock('../../src/services');
jest.mock('preact-router');
jest.mock('../../src/store/actions');
jest.mock('../../src/store');

const useRootStateMock = useRootState as jest.Mock;

const emailInputSelector = '[placeholder="Email"]';
const passwordInputSelector = '[placeholder="Password"]';

beforeEach(() => {
	useRootStateMock.mockReturnValue([{ user: undefined }, jest.fn()]);
});

afterEach(() => {
	jest.clearAllMocks();
});

describe('# Login form validate', () => {
	it('should set button disabled when submit a empty form field', () => {
		const wrapper = mount(<Login />);

		setInputValue(wrapper, emailInputSelector, '123');

		const loginButton = wrapper.find('form button.btn-lg.btn-primary');
		expect(loginButton.props().disabled).toBe(true);
	});

	it('should not send form when given invalid email format', () => {
		const wrapper = mount(<Login />);
		setInputValue(wrapper, emailInputSelector, '123');
		setInputValue(wrapper, passwordInputSelector, '123');

		const loginButton = wrapper.find('form button.btn-lg.btn-primary');
		loginButton.simulate('click');

		expect(postLogin).not.toBeCalled();
	});

	it('should display error messages when errors is displayed', async () => {
		useRootStateMock.mockReturnValue([
			{
				user: null,
				errors: {
					email: ['is already exists'],
					password: ['is too long']
				}
			},
			jest.fn()
		]);
		const wrapper = shallow(<Login />);

		expect(wrapper.find('.error-messages > li')).toHaveLength(2);
		expect(wrapper.find('.error-messages').text()).toContain('email is already exists');
		expect(wrapper.find('.error-messages').text()).toContain('password is too long');
	});
});

describe('# Login request', () => {
	it('should be dispatch login action when sign in button clicked', async () => {
		const form = { email: 'test@example.com', password: '12345678' };
		const wrapper = mount(<Login />);
		setInputValue(wrapper, emailInputSelector, form.email);
		setInputValue(wrapper, passwordInputSelector, form.password);

		wrapper.find('form').simulate('submit');

		expect(login).toBeCalledTimes(1);
		expect(login).toBeCalledWith(form);
	});

	it('should not be send when given invalid form', () => {
		const wrapper = mount(<Login />);
		setInputValue(wrapper, emailInputSelector, '123');
		setInputValue(wrapper, passwordInputSelector, '12345678');
		wrapper.find('form').simulate('submit');

		expect(postLogin).not.toBeCalled();
	});

	it('should can goto home page after logged', async () => {
		useRootStateMock.mockReturnValue([{ user: {} }, jest.fn()]);
		shallow(<Login />);

		expect(route).toBeCalledWith('/');
	});
});