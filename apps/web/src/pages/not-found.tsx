import { BackButtonNavigation, Label } from "@/components/ui";

export function NotFoundPage() {
  return (
    <div className="mt-5 px-8">
      <BackButtonNavigation title="Voltar" />
      <Label className="m-5 text-xl font-bold">
        Ops! Página não encontrada.
      </Label>
      <div
        style={{
          width: "100%",
          height: "0",
          paddingBottom: "100%",
          position: "relative",
        }}
      >
        <iframe
          src="https://giphy.com/embed/W5YVAfSttCqre"
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/W5YVAfSttCqre">via GIPHY</a>
      </p>
    </div>
  );
}
