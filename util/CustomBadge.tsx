import { Badge } from "@/components/ui/badge";

export function BadgeDemo({
  text = "admin",
  styles = "bg-green-600",
}: {
  text: string;
  styles: string;
}) {
  return <Badge className={`${styles}`}>{text}</Badge>;
}
