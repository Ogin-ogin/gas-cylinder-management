export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}
export declare function Badge(props: BadgeProps): JSX.Element;
