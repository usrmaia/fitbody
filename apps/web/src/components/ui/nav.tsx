import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, type NavigateOptions, type To } from "react-router";

import { Button, Label } from "@/components/ui";

export function BackButtonNavigation(props: {
  title: string;
  to?: To;
  options?: NavigateOptions;
  className?: string;
}) {
  const navigate = useNavigate();

  const handleGoBack = () =>
    props.to ? navigate(props.to, props.options) : navigate(-1);

  return (
    <nav className={`my-5 ${props.className}`}>
      <Link to={props.to || "#"} onClick={handleGoBack}>
        <Button
          variant="ghost"
          size="sm"
          className="relative w-full overflow-hidden"
        >
          <ChevronLeft size={24} className="text-primary absolute left-4" />
          <Label className="text-primary block w-full truncate px-8 text-lg font-bold">
            {props.title}
          </Label>
        </Button>
      </Link>
    </nav>
  );
}
