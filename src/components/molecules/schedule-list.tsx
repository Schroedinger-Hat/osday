interface ScheduleItem {
  name?: string;
  title: string;
  startTime: string;
  endTime: string;
  timeZone?: string;
}

export default function ScheduleList({
  scheduleItems,
}: {
  scheduleItems: ScheduleItem[];
}) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="space-y-6">
        {scheduleItems.map((item, index) => (
          <div key={index} className="text-center">
            {item.name ? (
              <h3 className="text-2xl font-semibold text-blue-900">
                {item.name}
              </h3>
            ) : null}
            <p className="mt-1 text-xl text-blue-900">{item.title}</p>
            <p className="mt-2 font-mono text-blue-900/70">
              {item.startTime} – {item.endTime} {item.timeZone}
            </p>
            {index < scheduleItems.length - 1 && (
              <div className="mt-6 border-t border-blue-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
