interface AdSlotProps {
  label?: string;
  className?: string;
}

export function AdSlot({ label = "Ad Space", className = "" }: AdSlotProps) {
  return (
    <div className={`ad-slot ${className}`}>
      <span>{label}</span>
    </div>
  );
}
