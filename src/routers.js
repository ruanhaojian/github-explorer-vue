export default function (router) {
	router.map ({
		'/': {
			name: 'index',
			component: require ('./components/UserPage/index.vue')
		}
	})
	// router.beforeEach((transition)=>{
	//   transition.next()
	// })
}
