import React from 'react';

export type Props = {
	iconSlot?: React.ReactNode;
	titleSlot?: React.ReactNode;
	cardsSlot?: React.ReactNode;
	footerSlot?: React.ReactNode;
	className?: string;
	createButtonSlot?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
