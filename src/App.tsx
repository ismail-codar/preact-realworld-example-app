import { Fragment, h, JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import { route, Route, Router } from 'preact-router';
import { createHashHistory } from 'history';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import ArticlePage from './pages/ArticlePage';
import Editor from './pages/Editor';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import useStore from './store';

export default function App() {
	return (
		<Fragment>
			<Header />
			<Router history={createHashHistory()}>
				<Route path="/" component={Home} />
				<Route path="/my-feeds" component={Home} />
				<Route path="/tag/:tag" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<AuthenticatedRoute path="/settings" component={Settings} />
				<Route path="/editor/:slug?" component={Editor} />
				<Route path="/article/:slug" component={ArticlePage} />
				<Route path="/:username" component={Profile} />
				<Route path="/:username/favorites" component={Profile} />
			</Router>
			<Footer />
		</Fragment>
	);
}

function AuthenticatedRoute(props: { path: string; component: () => JSX.Element | null }) {
	const isAuthenticated = useStore(state => state.isAuthenticated);

	useEffect(() => {
		if (!isAuthenticated) route('/login', true);
	}, [isAuthenticated]);

	if (!isAuthenticated) return null;

	return <Route {...props} />;
}
