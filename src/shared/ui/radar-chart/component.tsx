import React from 'react';
import { CANVAS_SIZE, CHART_SIZE } from './constants';
import { Props } from './types';
import { map } from '&shared/utils';

function getPointOnCanvas(
	angle: number,
	distance: number,
	center: { x: number; y: number } = { x: 0, y: 0 }
): { x: number; y: number } {
	return {
		x: center.x + Math.cos(angle - Math.PI / 2) * distance * CHART_SIZE,
		y: center.y + Math.sin(angle - Math.PI / 2) * distance * CHART_SIZE
	};
}

const center = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };

export function RadarChart<T extends string | symbol | number>({ data, getLabel, ...attributes }: Props<T>) {
	const weightsPath = React.useMemo(() => {
		return (
			Object.values<number>(data)
				.map((value, index, arr) => {
					const angle = (index / arr.length) * Math.PI * 2 + Math.PI / 3;
					return getPointOnCanvas(angle, map(value, 0, 1, 1 / 6, 1) / 2, center);
				})
				.reduce((d, point, index) => {
					const pointPosition = point.x.toFixed(4) + ',' + point.y.toFixed(4);
					const prefix = index === 0 ? '' : 'L';
					return d + prefix + pointPosition;
				}, 'M') + 'z'
		);
	}, [data]);

	const axesPaths = React.useMemo(() => {
		return Array.from(Array(Math.round(weightsPath.length / 2)), (_, index) => {
			const angle = (index / 6) * Math.PI * 2 + Math.PI / 3;

			const { x, y } = getPointOnCanvas(angle, 0.5, center);

			return `M ${center.x} ${center.y} L ${x} ${y}`;
		});
	}, [weightsPath]);

	const scalesData = React.useMemo(() => {
		return Array.from(Array(6), (_, index) => {
			const r = ((index + 1) * CHART_SIZE) / 12;

			return { r };
		});
	}, []);

	const titles = React.useMemo(
		() =>
			Object.keys(data).map((colId, index) => {
				const label = getLabel(colId as T);

				const angle = (index / 6) * Math.PI * 2 + Math.PI / 3;
				const isExactlyVertical = angle % (Math.PI / 2) === 0 && angle % Math.PI === 0;

				const { x, y } = getPointOnCanvas(angle, 0.62, center);
				const d = y - center.y;

				return { x, y: isExactlyVertical ? y - d * 0.07 : y, label };
			}),
		[data]
	);

	return (
		<svg {...attributes} viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}>
			<defs>
				<linearGradient id="weights-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="#9F3FFF"></stop>
					<stop offset="100%" stop-color="#3F69FF"></stop>
				</linearGradient>
			</defs>
			{scalesData.map(({ r }) => (
				<circle cx={center.x} cy={center.y} r={r} fill="transparent" stroke="var(--color-gray-10)" stroke-width="2" />
			))}
			{axesPaths.map((path) => (
				<path d={path} fill="transparent" stroke="var(--color-gray-10)" strokeWidth="2" />
			))}
			<path
				d={weightsPath}
				fill="url(#weights-gradient)"
				stroke="url(#weights-gradient)"
				strokeWidth={4}
				strokeLinejoin="round"
				fill-opacity="0.2"
			></path>
			{titles.map(({ x, y, label }) => (
				<text x={x} y={y} font-size="16" fill="var(--text-and-icon-80)" text-anchor="middle">
					{label}
				</text>
			))}
		</svg>
	);
}
