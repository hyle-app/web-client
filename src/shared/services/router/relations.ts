import { sample } from 'effector';
import { inputs, internals, outputs } from './model';

sample({
	clock: inputs.pushRoute,
	source: { routerInstance: internals.$routerInstance },
	filter: ({ routerInstance }) => Boolean(routerInstance),
	fn: ({ routerInstance }, { to, search }) => {
		let newSearchState = new URLSearchParams(window.location.search);
		if (typeof search === 'function') {
			newSearchState = search(newSearchState);
		}

		if (typeof search === 'object' && 'has' in search) {
			newSearchState = search;
		}

		return {
			router: routerInstance!,
			to: to ?? routerInstance!.state.location.pathname,
			search: newSearchState,
			replace: false
		};
	},
	target: internals.navigateFx
});

sample({
	clock: inputs.replaceRoute,
	source: { routerInstance: internals.$routerInstance },
	filter: ({ routerInstance }) => Boolean(routerInstance),
	fn: ({ routerInstance }, { to, search }) => {
		let newSearchState = new URLSearchParams(window.location.search);
		if (typeof search === 'function') {
			newSearchState = search(newSearchState);
		}

		if (typeof search === 'object' && 'has' in search) {
			newSearchState = search;
		}

		return {
			router: routerInstance!,
			to: to ?? routerInstance!.state.location.pathname,
			search: newSearchState,
			replace: true
		};
	},
	target: internals.navigateFx
});

sample({
	clock: [inputs.replaceRoute, inputs.pushRoute],
	filter: ({ to }) => typeof to === 'string',
	fn: ({ to }) => {
		return to;
	},
	target: outputs.$currentPath
});

sample({
	clock: inputs.setInstance,
	target: internals.$routerInstance
});
