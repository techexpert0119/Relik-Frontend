import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import Container from '../Container';
import { ICountry } from '@/data/interfaces/country';

const EventLinkFeature: FC<{ feature: IFeature; preview?: boolean }> = ({
  feature,
  preview,
}) => {
  const country = feature.values.eventValues?.country as unknown as ICountry;
  const date = new Date(feature.values.eventValues?.date || '');
  const month = date
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return (
    <Container
      title={feature.values.eventValues?.title}
      isPageThemeEnabled={true}
      style={{
        ...(feature.values.eventValues?.fontColor
          ? { color: feature.values.eventValues?.fontColor }
          : {}),
        ...(feature.values.eventValues?.backgroundColor
          ? { background: feature.values.eventValues?.backgroundColor }
          : {}),
        borderRadius: '8px',
      }}
    >
      <div
        className={`${preview ? 'gap-7 px-7' : 'gap-10 px-10'} flex items-center w-full min-h-[56px] py-4`}
      >
        <div className="py-1 text-center">
          <p className="opacity-50 text-base">{month}</p>
          <p className="text-2xl">{day}</p>
          <p className="opacity-50 text-base">{year}</p>
        </div>
        <div
          className={`${preview && 'hidden'}`}
          style={{
            width: '2px',
            background: feature.values.eventValues?.fontColor,
            height: '50px',
          }}
        />
        <div className="flex flex-col w-full gap-3">
          <div>
            <p className="text-lg">{feature.values.eventValues?.location}</p>
            <p className="opacity-50 text-base">{`${feature.values.eventValues?.city} ${country?.name}`}</p>
          </div>

          <a
            href={feature.values.eventValues?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="border text-base"
              style={{ borderColor: feature.values.eventValues?.fontColor }}
              variant={'ghost'}
            >
              <Ticket className="mr-2" />
              Tickets
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default EventLinkFeature;

/* <a
  href={generateIcsCalendarFile({
    startDate: date,
    title: feature.values.eventValues?.title ?? '',
    description: feature.values.eventValues?.title ?? '',
  })}
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="w-full border text-base" variant="ghost">
    <Calendar className="mr-2" />
    Add to calendar
  </Button>
</a>; */

// export interface CalendarEvent {
//   title: string;
//   description: string;
//   startDate: Date;
//   endDate?: Date;
//   durationInMinutes?: number;
//   address?: string;
// }

// const MINUTE_IN_MS = 60 * 1000;

// function getEndTime(calendarEvent: CalendarEvent) {
//   return (
//     calendarEvent.endDate ??
//     addMinutesToDate(
//       calendarEvent.startDate,
//       calendarEvent.durationInMinutes ?? 0
//     )
//   );
// }

// function formatDateForCalendarUrl(date: Date) {
//   return date.toISOString().replace(/-|:|\.\d+/g, '');
// }

// function addMinutesToDate(date: Date, minutes: number) {
//   return new Date(date.getTime() + minutes * MINUTE_IN_MS);
// }

// function generateGoogleCalendarUrl(calendarEvent: CalendarEvent) {
//   const startDate = formatDateForCalendarUrl(calendarEvent.startDate);
//   const endDate = formatDateForCalendarUrl(getEndTime(calendarEvent));

//   const encodedUrl = encodeURI(
//     [
//       "https://www.google.com/calendar/render",
//       "?action=TEMPLATE",
//       `&text=${calendarEvent.title || ""}`,
//       `&dates=${startDate || ""}`,
//       `/${endDate || ""}`,
//       // TODO: append video appointment link to description
//       `&details=${
//         `${calendarEvent.description}\n` + `https://relik.com` || ""
//       }`,
//       `&location=${calendarEvent.address || ""}`,
//       "&sprop=&sprop=name:",
//     ].join("")
//   );

//   return encodedUrl;
// }

// // Generates ICS for Apple and Outlook calendars
// function generateIcsCalendarFile(calendarEvent: CalendarEvent) {
//   const startDate = formatDateForCalendarUrl(calendarEvent.startDate);
//   const endDate = formatDateForCalendarUrl(getEndTime(calendarEvent));

//   const encodedUrl = encodeURI(
//     `data:text/calendar;charset=utf8,${[
//       'BEGIN:VCALENDAR',
//       'VERSION:2.0',
//       'BEGIN:VEVENT',
//       `URL:${document.URL}`, // TODO: insert video app url here
//       `DTSTART:${startDate || ''}`,
//       `DTEND:${endDate || ''}`,
//       `SUMMARY:${calendarEvent.title || ''}`,
//       `DESCRIPTION:${calendarEvent.description || ''}`,
//       `LOCATION:${calendarEvent.address || ''}`,
//       'END:VEVENT',
//       'END:VCALENDAR',
//     ].join('\n')}`
//   );

//   return encodedUrl;
// }
