import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <>
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <a href="https://www.facebook.com/schrodingerhat" target="_blank" rel="noreferrer" title="Facebook">
              <Image width={30} height={30} src="/icons/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://twitter.com/schrodinger_hat" target="_blank" rel="noreferrer" title="Twitter">
              <Image width={30} height={30} src="/icons/twitter.svg" alt="Twitter" />
            </a>
            <a href="https://discord.com/invite/RTXr8A3eFn" target="_blank" rel="noreferrer" title="Discord">
              <Image width={30} height={30} src="/icons/discord.svg" alt="Discord" />
            </a>
            <a href="https://www.instagram.com/schrodinger_hat/" target="_blank" rel="noreferrer" title="Instagram">
              <Image width={30} height={30} src="/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/schrodinger-hat/" title="Linkedin" target="_blank" rel="noreferrer">
              <Image width={28} height={28} src="/icons/linkedin.svg" alt="Linkedin" />
            </a>
            <a href="https://github.com/Schrodinger-Hat/osday-2023/" target="_blank" rel="noreferrer" title="Github">
              <Image width={30} height={30} src="/icons/github.svg" alt="Github" />
            </a>
            <a href="https://opencollective.com/schrodinger-hat/contribute" title="OpenCollective" target="_blank" rel="noreferrer">
              <Image width={30} height={30} src="/icons/opencollective.svg" alt="OpenCollective" />
            </a>
          </div>
          <div className="footer-center">
            <p>
              {t('github_repo_1')}
              <a href="https://github.com/Schrodinger-Hat/osday-2023/" target="_blank" rel="noreferrer">
              {t('github_repo_2')}
              </a>
            </p>
            <p>
              {t('github_issue_1')}
              <a href="https://github.com/Schrodinger-Hat/osday-2023/issues" target="_blank" rel="noreferrer">
              {t('github_issue_2')}
              </a>
            </p>
          </div>
          <div className="footer-footer">
            <p className="left">
              <Link href={'/privacy-and-permissions'}>{t('privacy_permissions')}</Link>
              <span>|</span>
              <Link href={'/dei'}>{t('dei')}</Link>
              <span>|</span>
              <Link href={'/code-of-conduct'}>{t('coc')}</Link>
            </p>
            <p className="center">Made with ❤️ in Florence & Paris and Netlify</p>
            <p className="right">©{(new Date()).getFullYear()} Schrödinger Hat</p>
          </div>
        </div>
      </footer>
    </>
  );
}
