<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let pathName = '';

	/**
	 * Need to explain the purpose of Y here.
	 * @type {URLSearchParams}
	 */
	let param;
	let product = '';
	let store = '';
	let sale = '';

	onMount(() => {
		pathName = window.location.pathname;
		param = new URLSearchParams(window.location.search);
		updateClasses();
	});

	function updateClasses() {
		switch (pathName) {
			case '/store':
				store = 'font-bold underline';
				product = '';
				sale = '';
				break;
			case '/':
				if (param.has('sale')) {
					sale = 'font-bold underline';
					product = '';
					store = '';
				} else {
					product = 'font-bold underline';
					sale = '';
					store = '';
				}
				break;
			case '/sale':
				sale = 'font-bold underline';
				product = '';
				store = '';
				break;
			default:
				product = '';
				sale = '';
				store = '';
		}
	}

	 @type {string}
	function navigate(path) {
		goto(path);
		updateClasses();
	}
</script>

<nav class="flex gap-2 text-lg">
	<a href="/" class={`${product} hover:underline`} on:click|preventDefault={() => navigate('/')}
		>제품</a
	>
	<a
		href="/?sale=true"
		class={`${sale} hover:underline`}
		on:click|preventDefault={() => navigate('/?sale=true')}>세일</a
	>
	<a
		href="/store"
		class={`${store} hover:underline`}
		on:click|preventDefault={() => navigate('/store')}>편집샵</a
	>
</nav>
