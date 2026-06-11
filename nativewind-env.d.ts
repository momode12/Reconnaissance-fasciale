// Provide a minimal ambient declaration for 'nativewind' to avoid
// "type definition not found" errors when the package types are not installed.
// This file can be removed if '@types/nativewind' or the package's own
// types are added to the project.

declare module 'nativewind' {
	import { ComponentType } from 'react';

	// Minimal styled helper signature compatible with common usage in React Native
	export function styled<Props = any>(component: ComponentType<Props>): ComponentType<Props & { className?: string }>;

	// Export a default object for import default compatibility
	const _default: {
		styled: typeof styled;
	};
	export default _default;
}

// Also allow triple-slash reference if types become available later
/// <reference types="nativewind" />