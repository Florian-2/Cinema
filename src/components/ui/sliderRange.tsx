"use client";

import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = {
	className?: string;
	min: number;
	max: number;
	minStepsBetweenThumbs: number;
	step: number;
	formatLabel?: (value: number) => string;
	value?: number[] | readonly number[];
	onValueChange?: (values: number[]) => void;
};

const SliderRange = React.forwardRef(
	({ className, min, max, step, formatLabel, value, onValueChange, ...props }: SliderProps, ref) => {
		const initialValue = Array.isArray(value) ? value : [min, max];
		const [localValues, setLocalValues] = useState(initialValue);

		const handleValueChange = (newValues: number[]) => {
			setLocalValues(newValues);
			if (onValueChange) {
				onValueChange(newValues);
			}
		};

		return (
			<SliderPrimitive.Root
				ref={ref as React.RefObject<HTMLDivElement>}
				min={min}
				max={max}
				step={step}
				value={localValues}
				onValueChange={handleValueChange}
				className={cn("relative flex w-full touch-none select-none items-center", className)}
				{...props}
			>
				<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
					<SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-50" />
				</SliderPrimitive.Track>
				{localValues.map((value, index) => (
					<React.Fragment key={index}>
						<div
							className="absolute text-center"
							style={{
								left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
								top: `10px`,
							}}
						>
							<span className="text-sm">{formatLabel ? formatLabel(value) : value}</span>
						</div>
						<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-slate-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" />
					</React.Fragment>
				))}
			</SliderPrimitive.Root>
		);
	}
);

SliderRange.displayName = SliderPrimitive.Root.displayName;

export { SliderRange };
