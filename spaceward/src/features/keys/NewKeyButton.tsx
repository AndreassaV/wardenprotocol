import { KeyIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useSpaceId } from "@/hooks/useSpaceId";
import useKeychainId from "@/hooks/useKeychainId";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRequestDialog } from "./KeyRequestDialog";
import useRequestKey from "@/hooks/useRequestKey";
import { useQueryHooks } from "@/hooks/useClient";

const FormSchema = z.object({});

export const NewKeyButton = React.forwardRef<HTMLButtonElement>(
	function NewKeyButtonWithRef({}, ref) {
		const [keychainId, setKeychainId] = useKeychainId();
		const { spaceId } = useSpaceId();
		const { state, error, keyRequest, requestKey, reset } = useRequestKey();
		const { isReady, warden } = useQueryHooks();
		const q = warden.warden.v1beta2.useKeychains({
			options: {
				enabled: isReady,
			},
		});

		const form = useForm<z.infer<typeof FormSchema>>({
			resolver: zodResolver(FormSchema),
		});

		return (
			<>
				<KeyRequestDialog
					state={state}
					error={error}
					keyRequest={keyRequest}
					reset={reset}
				/>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							ref={ref}
							className="mt-6 rounded bg-white py-[10px] px-5 font-semibold text-black ease-in duration-300 hover:bg-pixel-pink"
						>
							Create key
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle className="text-display text-3xl my-4">
								New key
							</SheetTitle>
						</SheetHeader>

						<div className="grid gap-4 py-4">
							<Form {...form}>
								<div className="flex flex-col gap-4">
									<FormField
										control={form.control}
										name="keychain"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Keychain</FormLabel>
												<Select
													onValueChange={(value) =>
														field.onChange(
															setKeychainId(
																value,
															),
														)
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a keychain" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{q.data?.keychains?.map(
															(kr) => (
																<SelectItem
																	key={kr.id}
																	value={kr.id.toString()}
																>
																	{
																		kr.description
																	}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								</div>
							</Form>
						</div>

						<SheetFooter>
							<SheetClose asChild>
								<Button
									type="submit"
									disabled={!keychainId || !spaceId}
									onClick={() => {
										if (!keychainId || !spaceId) return;
										requestKey(
											BigInt(keychainId),
											BigInt(spaceId),
										);
									}}
									className="flex flex-row gap-4 w-full"
								>
									<KeyIcon className="h-5 w-5" />
									Create
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</>
		);
	},
);
