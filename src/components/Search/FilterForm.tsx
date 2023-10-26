"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths, subMonths } from "date-fns";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { SelectSortBy } from "./SelectSortBy";
import { DatePicker } from "./DatePicker";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "../ui/checkbox";
import { genres } from "@/shared/genres";
import { SliderRange } from "../ui/sliderRange";
import { Slider } from "../ui/slider";
import { formSchema, formSchemaType } from "@/shared/validator";
import { convertToUrl } from "@/lib/url";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function FilterForm() {
	const router = useRouter();
	const pathname = usePathname();
	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(data: formSchemaType) {
		const urlWithFilter = convertToUrl(data);
		router.push(`${pathname}?${urlWithFilter.toString()}`);

		// return new Promise((res) => setTimeout(() => res(true), 3000));
	}

	return (
		<Form {...form}>
			<form
				className="w-full flex flex-col gap-6"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="sortBy"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Trier par</FormLabel>

							<SelectSortBy onChange={field.onChange} />

							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<Separator />

				<div>
					<p className="text-sm font-medium">Date de sortie</p>

					<FormField
						control={form.control}
						name="fromDate"
						render={({ field }) => (
							<FormItem className="flex items-center gap-1">
								<FormLabel className="font-light">Du</FormLabel>

								<DatePicker
									onChange={field.onChange}
									value={field.value}
									// defaultDate={subMonths(new Date(), 1)}
								/>
								<FormMessage />
							</FormItem>
						)}
					></FormField>

					<FormField
						control={form.control}
						name="toDate"
						defaultValue={addMonths(new Date(), 1)}
						render={({ field }) => (
							<FormItem className="flex items-center gap-1">
								<FormLabel className="font-light">au</FormLabel>

								<DatePicker
									onChange={field.onChange}
									value={field.value}
									defaultDate={addMonths(new Date(), 1)}
								/>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
				</div>

				<Separator />

				<FormField
					control={form.control}
					name="genres"
					render={() => (
						<FormItem>
							<FormLabel>Genres</FormLabel>

							{genres.map((genre) => (
								<FormField
									key={genre.id}
									control={form.control}
									defaultValue={[]}
									name="genres"
									render={({ field }) => {
										return (
											<FormItem
												key={genre.id}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(genre.id)}
														onCheckedChange={(checked: boolean) => {
															return checked
																? field.onChange([...field.value, genre.id])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== genre.id
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal cursor-pointer">
													{genre.label}
												</FormLabel>

												<FormMessage />
											</FormItem>
										);
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>

				<Separator />

				<FormField
					control={form.control}
					name="voteAverage"
					render={({ field }) => (
						<FormItem className="">
							<FormLabel>Notes</FormLabel>

							<FormControl>
								<SliderRange
									min={1}
									max={10}
									step={1}
									value={[1, 10]}
									onValueChange={field.onChange}
									minStepsBetweenThumbs={0}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<FormField
					control={form.control}
					name="voteCount"
					render={({ field }) => (
						<FormItem className="mt-5">
							<FormLabel className="flex justify-between gap-2 mb-3">
								Nombre de votes minimum <span>{field.value || 100}</span>
							</FormLabel>

							<FormControl>
								<Slider
									min={0}
									max={1000}
									step={100}
									defaultValue={[100]}
									onValueChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					Rechercher
					{form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				</Button>
			</form>
		</Form>
	);
}
