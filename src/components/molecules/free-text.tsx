import { SectionContainer } from "../atoms/layout/SectionContainer";
import { Heading } from "../atoms/typography/Heading";
import { Typography } from "../atoms/typography/Typography";

export function FreeText() {
	return (
		<SectionContainer size="tiny">
			<Heading level={2}>What an incredible experience!</Heading>
			<Typography variant="large" className="mb-4">
				A huge thank you to everyone who joined us for the latest edition of
				Open Source Day!
				<br />
				<br />
				On <b>April 24th</b> at <i>The Social Hub Firenze Belfiore</i> in
				Florence, we shared a day packed with inspiring talks diving deep into
				today's most exciting open source trends.
				<br />
				<br />
				On <b>April 25th</b>, we rolled up our sleeves for a day of hands-on
				workshops, deepening our skills and collaborating side by side with
				fellow developers.
				<br />
				<br />
				It was a true privilege to spend these two days with such a passionate
				and curious community. Thank you to the speakers, the organizers, and
				every single attendee who made this event truly special.
				<br />
				<br />
				<b>See you at the next edition!</b>
			</Typography>
		</SectionContainer>
	);
}