
export const ROUTES = {
	HOME: 'HOME',
	USER_DETAIL: 'USER_DETAIL',
	USER_REPO_LIST: 'USER_REPO_LIST',
	REPO_DETAIL: 'REPO_DETAIL',
	NOT_FOUND: 'NOT_FOUND'
};

export default function (router) {

	router.map ({
		'/': {
			name: ROUTES.HOME,
			component: require ('./components/UserPage/index.vue')
		},
		'/user/:username': {
			name: ROUTES.USER_DETAIL,
			component: require ('./components/UserPage/index.vue')
		},
		'/user/:username/repos': {
			name: ROUTES.USER_REPO_LIST,
			component: require ('./components/RepoList/index.vue')
		},
		'/user/:username/repos/:repoName': {
			name: ROUTES.REPO_DETAIL,
			component: require ('./components/RepoDetail/index.vue')
		},
		'*': {
			name: ROUTES.NOT_FOUND,
			component: require ('./components/NotFound/index.vue')
		}
	})
	// router.beforeEach((transition)=>{
	//   transition.next()
	// })
}
