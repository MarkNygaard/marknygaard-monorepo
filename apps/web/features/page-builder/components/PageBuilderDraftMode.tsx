"use client";

import { useCallback, useMemo } from "react";
import { BLOCK_COMPONENTS_CLIENT } from "@/components/Blocks";
import type { PageBuilderBlock } from "@/features/page-builder/types/pagebuilder";
import { createSanityDataAttribute } from "@/lib/sanity/dataAttributes";
import { useOptimistic } from "@sanity/visual-editing/react";

interface PageBuilderProps {
	blocks: PageBuilderBlock[];
	documentId: string;
	documentType: string;
}

/**
 * Error fallback component for unknown block types
 */
function UnknownBlockError({ blockType, blockKey }: { blockType: string; blockKey: string }) {
	return (
		<div
			key={`${blockType}-${blockKey}`}
			className="text-muted-foreground bg-muted border-muted-foreground/20 flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-center"
			role="alert"
			aria-label={`Unknown block type: ${blockType}`}
		>
			<div className="space-y-2">
				<p>Component not found for block type:</p>
				<code className="bg-background rounded px-2 py-1 font-mono text-sm">{blockType}</code>
			</div>
		</div>
	);
}

/**
 * PageBuilderDraftMode component for rendering dynamic content blocks with optimistic updates
 * Only used when draft mode is enabled
 */
export function PageBuilderDraftMode({ blocks: initialBlocks, documentId, documentType }: PageBuilderProps) {
	// Enable optimistic updates for real-time editing in Sanity Presentation
	const blocks = useOptimistic<PageBuilderBlock[], any>(initialBlocks, (currentBlocks, action) => {
		if (action.id === documentId && action.document?.pageBuilder) {
			return action.document.pageBuilder;
		}
		return currentBlocks;
	});

	const renderBlock = useCallback(
		(block: PageBuilderBlock, index: number) => {
			const Component = BLOCK_COMPONENTS_CLIENT[block._type as keyof typeof BLOCK_COMPONENTS_CLIENT];

			if (!Component) {
				return <UnknownBlockError key={`${block._type}-${block._key}`} blockType={block._type} blockKey={block._key} />;
			}

			const dataAttribute = createSanityDataAttribute(documentId, documentType, `pageBuilder[_key=="${block._key}"]`);

			const componentProps = {
				...(block as any),
				index,
			};

			return (
				<div key={`${block._type}-${block._key}`} data-sanity={dataAttribute}>
					<Component {...componentProps} />
				</div>
			);
		},
		[documentId, documentType]
	);

	const containerDataAttribute = useMemo(
		() => createSanityDataAttribute(documentId, documentType, "pageBuilder"),
		[documentId, documentType]
	);

	// Handle empty state
	if (!blocks || blocks.length === 0) {
		return (
			<div className="container mx-auto px-4 py-16">
				<div className="text-center text-gray-500">No page builder blocks configured</div>
			</div>
		);
	}

	return (
		<div className="w-full" data-sanity={containerDataAttribute} aria-label="Page content">
			{blocks.map((block, index) => renderBlock(block, index))}
		</div>
	);
}
