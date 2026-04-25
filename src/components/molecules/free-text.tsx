import { SectionContainer } from "../atoms/layout/SectionContainer";
import { Heading } from "../atoms/typography/Heading";
import { Typography } from "../atoms/typography/Typography";

interface FreeTextProps {
  heading: string;
  children: React.ReactNode;
}

export function FreeText({heading, children}: FreeTextProps) {
	return (
		<SectionContainer size="tiny">
			<Heading level={2}>{heading}</Heading>
			<Typography variant="large" className="mb-4">
				{children}
			</Typography>
		</SectionContainer>
	);
}