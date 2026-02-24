import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, type NavigateOptions, type To } from "react-router";

import { Button, Label } from "@/components/ui";

export function BackButtonNavigation(props: {
  title: string;
  to?: To;
  options?: NavigateOptions;
}) {
  const navigate = useNavigate();

  const handleGoBack = () =>
    props.to ? navigate(props.to, props.options) : navigate(-1);

  return (
    <nav>
      <Link to={props.to || "#"} onClick={handleGoBack}>
        <Button variant="ghost" size="sm" className="relative w-full">
          <ChevronLeft size={24} className="text-primary absolute left-4" />
          <Label className="text-primary text-lg font-bold">
            {props.title}
          </Label>
        </Button>
      </Link>
    </nav>
  );
}
