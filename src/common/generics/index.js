export const debounce = (func, timeout = 1000) => {
	let timer;

	return function executedFunction(...args){
		const later = () => {
			timer = null;
			func(...args);
		};

		clearTimeout(timer);
		timer = setTimeout(later, timeout);
	};
};