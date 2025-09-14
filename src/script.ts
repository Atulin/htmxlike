const actions = document.querySelectorAll("[o-action]");

const fetchData = async (method: string, url: string) => {
	const response = await fetch(url, { method });
	const data = await response.json();
	return data;
}

for (const actionElement of actions) {
	const [method, url] = actionElement.getAttribute("o-action")?.split(" ") ?? [null, null];
	const ref = actionElement.getAttribute("o-ref");
	const targetElement = ref ? document.getElementById(ref) : actionElement;

	if (!url || !targetElement) continue;

	actionElement.addEventListener("click", async (event) => {
		event.preventDefault();	

		const res = await fetchData(method ?? 'GET', url);

		for (const [key, value] of Object.entries(res)) {
			const target = targetElement.querySelector(`[o-prop="${key}"]`) as HTMLElement | null;

			if (!target) continue;

			target.innerText = String(value);
		}
	});
  
}

