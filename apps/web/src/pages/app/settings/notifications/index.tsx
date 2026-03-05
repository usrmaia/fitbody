import { BackButtonNavigation, Label, Switch } from "@/components/ui";

export function NotificationsSettingsPage() {
  return (
    <>
      <BackButtonNavigation title="Notificações" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-md border p-4">
          <Label className="font-mono">Notificações por Email</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between rounded-md border p-4">
          <Label className="font-mono">Notificações por Push</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between rounded-md border p-4">
          <Label className="font-mono">Vibração</Label>
          <Switch />
        </div>
      </div>
    </>
  );
}
