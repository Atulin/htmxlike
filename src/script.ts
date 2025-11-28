import { getProp, tryAddClass, tryRemoveClass } from "./helpers";

const actions = document.querySelectorAll("[o-action]");

const fetchData = async (
	method: string,
	url: string,
): Promise<object | "error"> => {
	try {
		const response = await fetch(url, { method });

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return "error";
	}
};

const classPropNames = ["success", "loading", "error"] as const;

for (const actionElement of actions) {
	const [method = "GET", url] =
		actionElement.getAttribute("o-action")?.split(" ") ?? [];

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

		tryAddClass(targetElement, classProps.loading);

		const res = await fetchData(method, url);

		tryRemoveClass(targetElement, classProps.loading);

		if (res === "error") {
			tryAddClass(targetElement, classProps.error);
			return;
		}

		tryAddClass(targetElement, classProps.success);

		const elements = targetElement.querySelectorAll(
			"[o-prop]",
		) as NodeListOf<HTMLElement>;

		for (const element of elements) {
			const propName = element.getAttribute("o-prop");
			if (!propName) {
				continue;
			}

			const value = getProp(res, propName);
			element.innerText = String(value);
		}
	});
}
