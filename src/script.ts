const actions = document.querySelectorAll("[o-action]");

const fetchData = async (
	method: string,
	url: string,
): Promise<object | "error"> => {
	try {
		const response = await fetch(url, { method });

		if (!response.ok) throw new Error("Network response was not ok");

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return "error";
	}
};

const classPropNames = ["success", "loading", "error"] as const;

for (const actionElement of actions) {
	const [method, url] = actionElement.getAttribute("o-action")?.split(" ") ?? [
		null,
		null,
	];
	const ref = actionElement.getAttribute("o-ref");
	const targetElement = ref ? document.getElementById(ref) : actionElement;

	if (!url || !targetElement) continue;

	const classProps: { [key in (typeof classPropNames)[number]]?: string } =
		Object.fromEntries(
			classPropNames.map((className) => {
				const cls = `o-class-${className}`;
				return [className, targetElement.getAttribute(cls)];
			}),
		);

	actionElement.addEventListener("click", async (event) => {
		event.preventDefault();

		classProps.loading && targetElement.classList.add(classProps.loading);

		const res = await fetchData(method ?? "GET", url);

		classProps.loading && targetElement.classList.remove(classProps.loading);

		if (res === "error") {
			classProps.error && targetElement.classList.add(classProps.error);
			return;
		}

		classProps.success && targetElement.classList.add(classProps.success);

		for (const [key, value] of Object.entries(res)) {
			const target = targetElement.querySelector(
				`[o-prop="${key}"]`,
			) as HTMLElement | null;

			if (!target) continue;

			target.innerText = String(value);
		}
	});
}
