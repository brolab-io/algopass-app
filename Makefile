remove-modules:
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' + & find . -name "pnpm-lock.yaml" -exec rm -rf '{}' +

web-dev:
	pnpm run dev
