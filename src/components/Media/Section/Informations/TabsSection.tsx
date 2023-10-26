import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Serie } from "@/shared/interfaces";

type Props = {
	serie: Serie;
};

export function TabsSerie({ serie }: Props) {
	return (
		<Tabs defaultValue="informations">
			<TabsList>
				<TabsTrigger value="informations">A savoir</TabsTrigger>
				<TabsTrigger value="seasons">Toutes les Saisons</TabsTrigger>
				<TabsTrigger value="providers">Ou regarder</TabsTrigger>
			</TabsList>

			<TabsContent value="informations">Informations...</TabsContent>
			<TabsContent value="seasons">Toutes les saisons...</TabsContent>
			<TabsContent value="providers">Ou regarder....</TabsContent>
		</Tabs>
	);
}
