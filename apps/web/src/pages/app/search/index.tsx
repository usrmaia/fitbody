import { BackButtonNavigation, Badge, Input } from "@/components/ui";

export function SearchPage() {
  return (
    <>
      <BackButtonNavigation title="Pesquisar" />
      <Input
        type="search"
        placeholder="Pesquisar treinos, desafios e artigos"
      />
      <div className="mt-5">
        <Badge variant="default" className="ml-2">
          Tudo
        </Badge>
        <Badge variant="outline" className="ml-2">
          Treinos
        </Badge>
        <Badge variant="outline" className="ml-2">
          Desafios
        </Badge>
        <Badge variant="outline" className="ml-2">
          Artigos
        </Badge>
      </div>
    </>
  );
}
