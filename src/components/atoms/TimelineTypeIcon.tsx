import {
  Calendar03Icon,
  Mic01Icon,
  BubbleChatIcon,
  Coffee02Icon,
  DrinkIcon,
} from "hugeicons-react";

interface TimelineTypeIconProps {
  type: string;
  className?: string;
}

export function TimelineTypeIcon({
  type,
  className = "",
}: TimelineTypeIconProps) {
  const iconProps = {
    className,
    size: 24,
  };

  switch (type) {
    case "logistic":
      return (
        <div className="flex items-center gap-2">
          <Calendar03Icon {...iconProps} />
          <span>Logistic</span>
        </div>
      );
    case "keynote":
      return (
        <div className="flex items-center gap-2">
          <BubbleChatIcon {...iconProps} />
          <span>Keynote</span>
        </div>
      );
    case "talk":
      return (
        <div className="flex items-center gap-2">
          <Mic01Icon {...iconProps} />
          <span>Talk</span>
        </div>
      );
    case "break":
      return (
        <div className="flex items-center gap-2">
          <Coffee02Icon {...iconProps} />
          <span>Break</span>
        </div>
      );
    case "drink":
      return (
        <div className="flex items-center gap-2">
          <DrinkIcon {...iconProps} />
          <span>Drink</span>
        </div>
      );
    default:
      return null;
  }
}
