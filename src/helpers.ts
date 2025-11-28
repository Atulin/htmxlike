export const tryAddClass = (
	element: Element,
	className: string | undefined | null,
) => {
	if (className) {
		element.classList.add(className);
	}
};

export const tryRemoveClass = (
	element: Element,
	className: string | undefined | null,
) => {
	if (className) {
		element.classList.remove(className);
	}
};

export const getProp = (obj: object, path: string): unknown =>
	path
		.split(".")
		.reduce(
			(current: unknown, prop: string): unknown =>
				(current as Record<string, unknown> | undefined)?.[prop],
			obj as unknown,
		);
