import { ReactNode } from 'react';

export default function TextSection({
  heading1,
  heading2,
  text = null
}: {
  heading1: string | ReactNode;
  heading2: string | ReactNode;
  text?: string | ReactNode | null;
}) {
  return (
    <section className="after_main text_section">
      <h3>{heading1}</h3>
      <h3>{heading2}</h3>
      {text ? <div className="text-section-text">{text}</div> : null}
    </section>
  );
}
