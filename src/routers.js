
export const ROUTES = {
	HOME: 'HOME',
	USER_DETAIL: 'USER_DETAIL',
	USER_REPO_LIST: 'USER_REPO_LIST',
	REPO_DETAIL: 'REPO_DETAIL',
};

export default function (router) {

	router.map ({
		'/': {
			name: ROUTES.HOME,
			component: require ('./components/UserPage/index.vue')
		},
		'/user/:username/repos': {
			name: ROUTES.USER_DETAIL,
			component: require ('./components/UserPage/index.vue')
		}
	})
	// router.beforeEach((transition)=>{
	//   transition.next()
	// })
}
