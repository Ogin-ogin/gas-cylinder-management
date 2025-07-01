export interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}
export declare function Alert(props: AlertProps): JSX.Element;
