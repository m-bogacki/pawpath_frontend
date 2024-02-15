type PageFunctionalTopBarProps = {
  children?: React.ReactNode;
  label: string;
};

export default function PageFunctionalTopBar({
  children,
  label,
}: PageFunctionalTopBarProps) {
  return (
    <div className="h-[10%] min-h-[80px] w-full flex items-center justify-between pr-8">
      <div className="h-full w-[300px] flex justify-center items-center">
        <p className="text-2xl">{label}</p>
      </div>
      {children}
    </div>
  );
}
