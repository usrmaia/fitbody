import { BackButtonNavigation, Label } from "@/components/ui";
import { Bell, CalendarCheck, Info } from "lucide-react";

export function NotificationsPage() {
  const notifications = [
    {
      icon: <Info className="h-5 w-5" />,
      title: "Nova mensagem de suporte",
      description: "Você recebeu uma nova mensagem da equipe de suporte.",
      time: "2 horas atrás",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Atualização de recurso",
      description: "O recurso de acompanhamento de atividades foi atualizado.",
      time: "1 dia atrás",
    },
    {
      icon: <CalendarCheck className="h-5 w-5" />,
      title: "Lembrete de treino",
      description: "Não se esqueça do seu treino programado para amanhã!",
      time: "3 dias atrás",
    },
  ];

  return (
    <div className="mt-5 px-8">
      <BackButtonNavigation title="Notificações" />
      <div className="mt-5 flex flex-col gap-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-card flex items-start gap-4 rounded-md p-4"
          >
            {notification.icon}
            <div>
              <Label className="text-lg font-bold">{notification.title}</Label>
              <Label className="text-sm">{notification.description}</Label>
              <Label className="mt-1 font-mono text-xs">
                {notification.time}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
