import { useTranslations } from 'next-intl';
import TextSection from '../components/TextSection';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Cookie, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function DEI() {
  const t = useTranslations('DEI');

  return (
    <>
      <div className='container'>
        <TextSection
          heading1={'Cookie Policy'}
          heading2={''}
          text={
            <>
            <p>Please read this cookie policy (&quot;cookie policy&quot;, &quot;policy&quot;) carefully before using osday.dev website (&quot;website&quot;, &quot;service&quot;) operated by schrodinger hat (&quot;us&quot;, &quot;we&quot;, &quot;our&quot;).</p>
            <h4>What are cookies?</h4>
            <p>
              Cookies are simple text files that are stored on your computer or mobile device by a website&apos;s server. Each cookie is unique to your web browser.
              It will contain some anonymous information such as a unique identifier, website&apos;s domain name, and some digits and numbers.
            </p>
            <h4>What types of cookies do we use?</h4>
            <h5>Necessary cookies</h5>
            <p>
              Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our website.
              For example, these cookies let us recognize that you have visualize our static notification.
            </p>
            <h5>Analytical cookies</h5>
            <p>
              These cookies enable us and third-party services to collect aggregated data for statistical purposes on how our visitors use the website.
              These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the website.
            </p>
            <h4>How to delete cookies?</h4>
            <p>
              If you want to restrict or block the cookies that are set by our website, you can do so through your browser setting.
              Alternatively, you can visit www.internetcookies.com, which contains comprehensive information on how to do this on a wide variety of browsers and devices.
              You will find general information about cookies and details on how to delete cookies from your device.
            </p>
            <h4>Contacting us</h4>
            <p>If you have any questions about this policy or our use of cookies, please contact us osday@schrodinger-hat.it.</p>
          </>
          }
          />
      </div>
    </>
  );
}
